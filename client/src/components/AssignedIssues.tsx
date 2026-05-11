import useAssignedIssues from '../hooks/useAssignedIssues';
import Issue from './Issue';

export default function AssignedIssuesPage() {
	const { data, loading, error } = useAssignedIssues();

	if (data.length === 0) {
		return (
			<div className='flex items-center justify-center py-20 text-sm text-neutral-400'>
				No assigned issues yet — when an you assign an issue it will appear
				here.
			</div>
		);
	}

	return (
		<div>
			{loading && (
				<div className='flex items-center justify-center py-20 gap-2 text-sm text-neutral-400 dark:text-neutral-500'>
					<svg className='animate-spin w-4 h-4' fill='none' viewBox='0 0 24 24'>
						<circle
							className='opacity-25'
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							strokeWidth='4'
						/>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8v8H4z'
						/>
					</svg>
					Loading assigned issues…
				</div>
			)}

			<div className='min-h-screen bg-neutral-50 dark:bg-neutral-950 px-6 py-6'>
				<p className='text-xs text-neutral-400 mb-4'>
					{data.length} assigned issue{data.length !== 1 ? 's' : ''}
				</p>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
					{data.map((issue) => (
						<Issue key={issue.id} issue={issue} />
					))}
				</div>
			</div>

			{error && (
				<div className='mx-6 mt-6 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400'>
					{error}
				</div>
			)}
		</div>
	);
}
