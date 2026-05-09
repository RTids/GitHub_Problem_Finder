export default async function getIssueByLabel(
	language: string,
	per_page: number,
	page: number,
) {
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/getIssueByLabel?language=${language}&per_page=${per_page}&page=${page}`,
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
