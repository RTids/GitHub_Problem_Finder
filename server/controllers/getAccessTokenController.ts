import fetch from 'node-fetch';

export const getAccessToken = async (req: any, res: any) => {
	const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
	const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

	const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;

	await fetch('https://github.com/login/oauth/access_token' + params, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log('Backend response', data);
			res.json(data);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ message: 'Failed to get access token.' });
		});
};
