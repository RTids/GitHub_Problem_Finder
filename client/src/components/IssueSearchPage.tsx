import { useState } from 'react';
import IssueList from './IssueList';
import useIssues from '../hooks/useIssues';

const LANGUAGES = [
	{ value: 'javascript', label: 'JavaScript' },
	{ value: 'typescript', label: 'TypeScript' },
	{ value: 'python', label: 'Python' },
	{ value: 'java', label: 'Java' },
	{ value: 'rust', label: 'Rust' },
	{ value: 'go', label: 'Go' },
];

export default function IssueSearchPage() {
	const [language, setLanguage] = useState<string>('javascript');
	const { loading, data, error } = useIssues(language);

	const currentLabel =
		LANGUAGES.find((l) => l.value === language)?.label ?? language;

	return (
		<div className='min-h-screen bg-neutral-50 dark:bg-neutral-950'>
			{/* Search bar */}
			<div className='bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-6 py-3 flex items-center gap-3 flex-wrap'>
				<span className='text-sm text-neutral-500 dark:text-neutral-400'>
					Browsing good first issues in
				</span>
				<div className='relative'>
					<select
						name='languages'
						id='language-selection'
						value={language}
						onChange={(e) => setLanguage(e.target.value)}
						className='appearance-none bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-sm font-medium rounded-full pl-3 pr-8 py-1.5 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors focus:outline-none'
					>
						{LANGUAGES.map((l) => (
							<option key={l.value} value={l.value}>
								{l.label}
							</option>
						))}
					</select>
					<svg
						className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth={2}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M19 9l-7 7-7-7'
						/>
					</svg>
				</div>
			</div>

			{/* Content */}
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
					Loading {currentLabel} issues…
				</div>
			)}

			{error && (
				<div className='mx-6 mt-6 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400'>
					{error}
				</div>
			)}

			{!loading && !error && <IssueList issueData={data?.items || null} />}
		</div>
	);
}
