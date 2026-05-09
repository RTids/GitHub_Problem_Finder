import fetch from 'node-fetch';
import Redis from 'ioredis';
import checkEnglish from '../helpers/checkEnglish.ts';

const redis = new Redis();

//Make sure to start redis server locally in local terminal using redis-server
//When deploying we can use Heroku to set this up

export const getIssueByLabel = async (req: any, res: any) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		return res.status(401).json({ message: 'Missing Authorization header' });
	}
	const { language, per_page, page } = req.query;

	const pageNum = parseInt(page as string, 10);
	const perPageNum = parseInt(per_page as string, 10);

	if ((pageNum - 1) * perPageNum >= 1000) {
		return res.status(422).json({
			error: 'GitHub only allows access to the first 1000 results.',
		});
	}
	const params = new URLSearchParams({
		q: [
			`language:${language}`,
			'label:"good first issue"',
			'state:open',
			'is:issue',
			'no:assignee',
		].join(' '),
		per_page: per_page.toString(),
		page: page.toString(),
	});

	//Get correct result cache result
	const cacheKey = `${language.toLowerCase()}-${per_page}-${page}`;
	const cached = await redis.get(cacheKey);

	if (cached) {
		console.log('Fetching from cache');
		// Only refresh if TTL is below a threshold (e.g. < 60s remaining of 300s TTL)
		const ttl = await redis.ttl(cacheKey);
		if (ttl < 60) {
			refreshCache(language, per_page, page, authHeader); // background refresh near expiry
		}
		return res.json(JSON.parse(cached));
	}

	async function refreshCache(
		language: string,
		per_page: number,
		page: number,
		authHeader: string,
	) {
		try {
			const params = new URLSearchParams({
				q: [
					`language:${language}`,
					'label:"good first issue"',
					'state:open',
					'is:issue',
					'no:assignee',
				].join(' '),
				per_page: per_page.toString(),
				page: page.toString(),
			});

			const response = await fetch(
				'https://api.github.com/search/issues?' + params,
				{
					headers: {
						Authorization: authHeader,
						Accept: 'application/vnd.github+json',
						'User-Agent': 'easy-issues-finder',
					},
				},
			);

			if (!response.ok) {
				console.error(
					'Background refresh failed: GitHub returned',
					response.status,
				);
				return;
			}

			const data: any = await response.json();
			const engData = await checkEnglish(data.items);

			const cacheData = {
				...data,
				items: engData,
			};

			await redis.set(
				`${language.toLowerCase()}-${per_page}-${page}`,
				JSON.stringify(cacheData),
				'EX',
				300,
			);

			console.log('Cache refreshed');
		} catch (err) {
			console.error('Background refresh failed', err);
		}
	}

	try {
		const response = await fetch(
			'https://api.github.com/search/issues?' + params,
			{
				headers: {
					Authorization: authHeader,
					Accept: 'application/vnd.github+json',
					'User-Agent': 'easy-issues-finder',
				},
			},
		);

		if (!response.ok) {
			const error = await response.text();
			console.error('GitHub API error:', error);
			return res.status(response.status).json({ error });
		}

		const data: any = await response.json();
		const engData = await checkEnglish(data.items);
		const cacheData = {
			...data,
			items: engData,
		};

		await redis.set(cacheKey, JSON.stringify(cacheData), 'EX', 300);
		res.json({
			...data,
			items: engData,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to fetch issues data' });
	}
};
