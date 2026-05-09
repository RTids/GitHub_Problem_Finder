import { useContext } from 'react';
import { SavedIssuesContext } from '../context/savedIssueContext';
import Issue from './Issue';

export default function SavedIssuesPage() {
	const context = useContext(SavedIssuesContext);
	if (!context) throw new Error('SavedIssuesContext is null.');
	const { savedIssues } = context;

	if (savedIssues.length === 0) {
		return (
			<div className='flex items-center justify-center py-20 text-sm text-neutral-400'>
				No saved issues yet — click the star on any issue to save it
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-neutral-50 dark:bg-neutral-950 px-6 py-6'>
			<p className='text-xs text-neutral-400 mb-4'>
				{savedIssues.length} saved issue{savedIssues.length !== 1 ? 's' : ''}
			</p>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
				{savedIssues.map((issue) => (
					<Issue key={issue.id} issue={issue} />
				))}
			</div>
		</div>
	);
}
