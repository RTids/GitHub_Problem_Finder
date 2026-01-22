import fetch from 'node-fetch';

export const getIssueByLabel = async (req: any, res: any) => {
	const authHeader = req.get('Authorization');
	const params = new URLSearchParams({
		q: `language:${language} is:public good-first-issues:>1`,
		sort: 'stars',
		order: 'desc',
	});

	if (!authHeader) {
		return res.status(401).json({ message: 'Missing Authorization header' });
	}

	try {
		const response = await fetch(
			'https://api.github.com/search/repositories?' + params,
			{
				headers: {
					Authorization: authHeader,
					Accept: 'application/json',
				},
			},
		);

		if (!response.ok) {
			const error = await response.text();
			console.error('GitHub API error:', error);
			return res.status(response.status).json({ error });
		}

		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to fetch user data' });
	}
};
