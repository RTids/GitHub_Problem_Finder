import { formatDistanceToNowStrict } from 'date-fns';
import type { SingleIssue } from '../types';
import stripMarkdown from '../helpers/stripMarkdown';
import { IoMdTime } from 'react-icons/io';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { SavedIssuesContext } from '../context/savedIssueContext';
import { useContext } from 'react';

export default function IssueList({ issue }: SingleIssue) {
	const context = useContext(SavedIssuesContext);
	if (!context) throw new Error('Context is Null on Issue');
	const { isSaved, toggleSaved } = context;
	return (
		<div
			className='group flex flex-col gap-2.5 rounded-xl p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors duration-150 cursor-pointer'
			key={issue.id}
		>
			{/* Tags */}
			<div className='flex flex-row justify-between'>
				<div className='flex flex-row gap-1'>
					{issue.labels?.slice(0, 3).map((label) => (
						<span
							key={label.id}
							className='text-[11px] font-medium px-2 py-0.5 rounded-full truncate max-w-35'
							style={{
								backgroundColor: `#${label.color}26`,
								color: `#${label.color}`,
								border: `1px solid #${label.color}44`,
							}}
						>
							{label.name}
						</span>
					))}
				</div>
				<div
					className='hover:cursor-pointer'
					onClick={(e) => {
						e.stopPropagation();
						toggleSaved(issue);
					}}
				>
					{isSaved(issue.id) ? <FaStar /> : <FaRegStar />}
				</div>
			</div>
			<a target='_blank' href={issue.html_url} className='flex flex-col flex-1'>
				{/* Title */}
				<h2 className='text-sm font-medium text-neutral-900 dark:text-neutral-100 leading-snug'>
					{issue.title}
				</h2>

				{/* Body */}
				<p className='text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-3 flex-1 overflow-scroll'>
					{issue.body ? stripMarkdown(issue.body) : 'No description provided.'}
				</p>

				{/* Footer */}
				<div className='flex items-center justify-between gap-2 pt-2.5 mt-auto border-t border-neutral-100 dark:border-neutral-800'>
					<div className='flex flex-row justify-center items-center gap-2'>
						<img
							className='h-5 w-5 rounded-full shrink-0'
							src={issue.user?.avatar_url}
							alt={issue.user?.login}
						/>
						<span className='text-xs text-neutral-500 dark:text-neutral-400 flex-1 truncate'>
							{issue.user?.login}
						</span>
					</div>
					<div className='flex flex-row justify-center items-center gap-2'>
						<span className='flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500'>
							<IoMdTime />
							{issue.created_at
								? formatDistanceToNowStrict(new Date(issue.created_at), {
										addSuffix: true,
									})
								: ''}
						</span>
						<span className='text-xs text-neutral-400 dark:text-neutral-500'>
							#{issue.number}
						</span>
					</div>
				</div>
			</a>
		</div>
	);
}
