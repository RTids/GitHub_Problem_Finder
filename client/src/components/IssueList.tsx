import type { IssueList } from '../types';
import Issue from './Issue';

export default function IssueList({
	issueData,
	page,
	totalCount,
	totalPages,
	perPage,
	onNext,
	onPrev,
	onPageSelect,
}: IssueList) {
	if (!issueData || issueData.length === 0) {
		return (
			<div className='flex items-center justify-center py-20 text-sm text-neutral-400 dark:text-neutral-500'>
				No issues found
			</div>
		);
	}

	const getPageNumbers = () => {
		if (totalPages <= 7) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}
		if (page <= 4) {
			return [1, 2, 3, 4, 5, '...', totalPages];
		}
		if (page >= totalPages - 3) {
			return [
				1,
				'...',
				totalPages - 4,
				totalPages - 3,
				totalPages - 2,
				totalPages - 1,
				totalPages,
			];
		}
		return [1, '...', page - 1, page, page + 1, '...', totalPages];
	};

	return (
		<div className='bg-neutral-50 dark:bg-neutral-950 min-h-screen px-6 py-6'>
			{/* Results summary */}
			<p className='text-xs text-neutral-400 dark:text-neutral-500 mb-4'>
				Showing {(page - 1) * perPage + 1}–
				{Math.min(page * perPage, totalCount)} of {totalCount.toLocaleString()}{' '}
				issues
			</p>

			{/* Issue grid */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
				{issueData.map((issue) => (
					<Issue key={issue.id} issue={issue} />
				))}
			</div>

			{/* Pagination */}
			<div className='flex items-center justify-center gap-1 mt-8'>
				<button
					onClick={onPrev}
					disabled={page === 1}
					className='px-3 py-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
				>
					← Prev
				</button>

				{getPageNumbers().map((p, i) =>
					p === '...' ? (
						<span key={`ellipsis-${i}`} className='px-2 text-neutral-400'>
							...
						</span>
					) : (
						<button
							key={p}
							onClick={() => onPageSelect(p as number)}
							className={`px-3 py-1.5 text-sm rounded-lg border transition-colors
                ${
									page === p
										? 'bg-blue-600 text-white border-blue-600'
										: 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
								}`}
						>
							{p}
						</button>
					),
				)}

				<button
					onClick={onNext}
					disabled={page >= totalPages}
					className='px-3 py-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
				>
					Next →
				</button>
			</div>

			{/* Page indicator */}
			<p className='text-center text-xs text-neutral-400 dark:text-neutral-500 mt-3'>
				Page {page} of {totalPages}
			</p>
		</div>
	);
}
