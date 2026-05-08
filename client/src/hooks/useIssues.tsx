import { useState, useEffect } from 'react';
import getIssueByLabel from '../api/getIssuesByLabel';
import type { CurrentIssueData } from '../types';

type IssueData = {
	items?: CurrentIssueData[];
};

type FetchState = {
	data: IssueData | null;
	loading: boolean;
	error: string | null;
};

export default function useIssues(language: string): FetchState {
	const [data, setData] = useState<IssueData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchIssueData() {
			setLoading(true);
			setError(null);
			try {
				const issues = await getIssueByLabel(language);
				setData(issues);
			} catch (err) {
				console.error(err);
				setError('Failed to load issues. Please try again later.');
			} finally {
				setLoading(false);
			}
		}
		fetchIssueData();
	}, [language]);

	return { data, error, loading };
}
