import fetch from 'node-fetch';

export const getAssignedIssues = async (req: any, res: any) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		return res.status(401).json({ message: 'Missing Authorization header' });
	}

	try {
		const response = await fetch(
			'https://api.github.com/issues?filter=assigned&state=all',
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
		res.json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to fetch assigned issues data' });
	}
};
