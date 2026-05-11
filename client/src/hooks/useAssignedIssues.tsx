import { useState, useEffect } from 'react';
import getAssignedIssues from '../api/getAssignedIssues';
import type { CurrentIssueData } from '../types';

type FetchState = {
	data: CurrentIssueData[];
	loading: boolean;
	error: string | null;
};

export default function useAssignedIssues(): FetchState {
	const [data, setData] = useState<CurrentIssueData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchAssignedIssues() {
			setLoading(true);
			setError(null);
			try {
				const issues = await getAssignedIssues();
				setData(issues);
			} catch (err) {
				console.error(err);
				setError('Failed to load issues. Please try again later.');
			} finally {
				setLoading(false);
			}
		}
		fetchAssignedIssues();
	}, []);

	return { data, error, loading };
}
