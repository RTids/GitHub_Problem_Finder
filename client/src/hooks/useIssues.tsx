import { useState, useEffect } from 'react';
import getIssueByLabel from '../api/getIssuesByLabel';
import type { CurrentIssueData } from '../types';

type IssueData = {
	items?: CurrentIssueData[];
	total_count?: number;
};

type FetchState = {
	data: IssueData | null;
	loading: boolean;
	error: string | null;
};

export default function useIssues(
	language: string,
	per_page: number,
	page: number,
): FetchState {
	const [data, setData] = useState<IssueData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchIssueData() {
			setLoading(true);
			setError(null);
			try {
				const issues = await getIssueByLabel(language, per_page, page);
				setData(issues);
			} catch (err) {
				console.error(err);
				setError('Failed to load issues. Please try again later.');
			} finally {
				setLoading(false);
			}
		}
		fetchIssueData();
	}, [language, per_page, page]);

	return { data, error, loading };
}
