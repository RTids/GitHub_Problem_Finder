import fetch from 'node-fetch';
import Redis from 'ioredis';

const redis = new Redis();

export const getIssueByLabel = async (req: any, res: any) => {
	const authHeader = req.get('Authorization');
	const { language } = req.query;
	const params = new URLSearchParams({
		q: `language:${language} is:public good-first-issues:>1`,
	});
	const cached = await redis.get(language.toLowerCase());

	if (cached) return res.json(JSON.parse(cached));

	if (!authHeader) {
		return res.status(401).json({ message: 'Missing Authorization header' });
	}

	try {
		const response = await fetch(
			'https://api.github.com/search/repositories?' + params,
			{
				headers: {
					Authorization: authHeader,
					Accept: 'application/vnd.github+json',
				},
			},
		);

		if (!response.ok) {
			const error = await response.text();
			console.error('GitHub API error:', error);
			return res.status(response.status).json({ error });
		}

		const data = await response.json();
		console.log(data);
		await redis.set(language.toLowerCase(), JSON.stringify(data), 'EX', 300);
		res.json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to fetch issues data' });
	}
};
