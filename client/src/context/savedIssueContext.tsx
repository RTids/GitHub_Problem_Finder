import { createContext } from 'react';
import { type CurrentIssueData } from '../types';

type SavedIssuesContextType = {
	savedIssues: CurrentIssueData[];
	toggleSaved: (issue: CurrentIssueData) => void;
	isSaved: (id: number) => boolean;
};

export const SavedIssuesContext = createContext<SavedIssuesContextType | null>(
	null,
);
