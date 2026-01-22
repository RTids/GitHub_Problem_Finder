export default async function getUserData() {
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/getUserData`,
		{
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			},
		},
	);

	if (!response.ok) {
		throw new Error('Failed to fetch user data');
	}

	return response.json();
}
