import type { IssueList } from '../types';
import Issue from './Issue';

export default function IssueList({ issueData }: IssueList) {
	if (!issueData || issueData.length === 0) {
		return (
			<div className='flex items-center justify-center py-20 text-sm text-neutral-400 dark:text-neutral-500'>
				No issues found
			</div>
		);
	}

	return (
		<div className='bg-neutral-50 dark:bg-neutral-950 min-h-screen px-6 py-6'>
			<p className='text-xs text-neutral-400 dark:text-neutral-500 mb-4'>
				{issueData.length} issue{issueData.length !== 1 ? 's' : ''} found
			</p>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
				{issueData.map((issue) => (
					<Issue key={issue.id} issue={issue} />
				))}
			</div>
		</div>
	);
}
