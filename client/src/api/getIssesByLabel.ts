export default async function getIssueByLabel() {
	const language = 'javascript';

	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/getIssueByLabel?language=${language}`,
		{
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			},
		},
	);
	if (!response.ok) {
		throw new Error('Failed to fetch Github issues data');
	}

	return response.json();
}
