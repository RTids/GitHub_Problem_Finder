import { type ReactNode } from 'react';
import { SavedIssuesContext } from '../context/savedIssueContext';
import useSavedIssues from '../hooks/useSavedIssues';

export function SavedIssuesProvider({ children }: { children: ReactNode }) {
	const { savedIssues, isSaved, toggleSaved } = useSavedIssues();

	return (
		<SavedIssuesContext.Provider value={{ savedIssues, isSaved, toggleSaved }}>
			{children}
		</SavedIssuesContext.Provider>
	);
}
