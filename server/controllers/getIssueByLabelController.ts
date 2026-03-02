import fetch from 'node-fetch';
import Redis from 'ioredis';

const redis = new Redis();

//Make sure to start redis server locally in local terminal using redis-server
//When deploying we can use Heroku to set this up

export const getIssueByLabel = async (req: any, res: any) => {
	const authHeader = req.get('Authorization');
	const { language } = req.query;
	const params = new URLSearchParams({
		q: [
			`language:${language}`,
			'label:"good first issue"',
			'state:open',
			'is:issue',
			'no:assignee',
		].join(' '),
	});
	const cached = await redis.get(language.toLowerCase());

	if (cached) {
		console.log('Fetching from cache');
		refreshCache(language, authHeader);
		return res.json(JSON.parse(cached));
	}

	async function refreshCache(language: string, authHeader: string) {
		try {
			const params = new URLSearchParams({
				q: [
					`language:${language}`,
					'label:"good first issue"',
					'state:open',
					'is:issue',
					'no:assignee',
				].join(' '),
				per_page: '100',
				page: '1',
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

			const data = await response.json();

			await redis.set(language.toLowerCase(), JSON.stringify(data), 'EX', 300);

			console.log('Cache refreshed');
		} catch (err) {
			console.error('Background refresh failed', err);
		}
	}

	if (!authHeader) {
		return res.status(401).json({ message: 'Missing Authorization header' });
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

		const data = await response.json();
		await redis.set(language.toLowerCase(), JSON.stringify(data), 'EX', 300);
		res.json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to fetch issues data' });
	}
};
