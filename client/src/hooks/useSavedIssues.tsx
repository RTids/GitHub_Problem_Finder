import { useState } from 'react';
import type { CurrentIssueData } from '../types';

export default function useSavedIssues() {
	const [savedIssues, setSavedIssues] = useState<CurrentIssueData[]>([]);

	//Check if issue is in the saved array
	const isSaved = (id: number) => savedIssues.some((i) => i.id === id);

	const toggleSaved = (issue: CurrentIssueData) => {
		if (savedIssues.some((i) => i.id === issue.id)) {
			setSavedIssues((prev) => prev.filter((i) => i.id !== issue.id));
		} else {
			setSavedIssues((prev) => [...prev, issue]);
		}
	};

	return { savedIssues, isSaved, toggleSaved };
}
