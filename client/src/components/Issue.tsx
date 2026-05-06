import { formatDistanceToNowStrict } from 'date-fns';
import type { currentIssueData } from '../types';

//Icons
import { IoMdTime } from 'react-icons/io';

type IssueProps = {
	issue: currentIssueData; // single issue
};

function getContrastColor(hex: string) {
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	const brightness = (r * 299 + g * 587 + b * 114) / 1000;

	return brightness > 155 ? '#000' : '#fff';
}

export default function IssueList({ issue }: IssueProps) {
	return (
		<div
			className='border-2 border-solid border-[#3D444D] h-90 w-70 rounded hover:border-white hover:cursor-pointer relative'
			key={issue.id}
		>
			<a
				target='_blank'
				href={issue.html_url}
				className='h-full w-full block p-2 text-xl font-bold'
			>
				<div className='flex flex-row justify-center items-center gap-1 absolute left-3 top-3'>
					<img
						className='h-5 w-5 rounded-full'
						src={issue.user?.avatar_url}
					></img>
					<p className='text-xs font-light'>{issue.user.login}</p>
				</div>
				<div className='flex flex-row justify-center items-center gap-1 absolute right-3 top-3'>
					{issue.labels?.slice(0, 3).map((label) => (
						<span
							key={label.id}
							className='text-xs px-2 py-1 rounded-full font-medium'
							style={{
								backgroundColor: `#${label.color}`,
								color: getContrastColor(label.color),
							}}
						>
							{label.name}
						</span>
					))}
				</div>
				<h1 className='mt-15 text-l'>{issue.title}</h1>
				<p className='text-sm font-thin overflow-hidden h-35'>{issue?.body}</p>
				<p className='font-light text-xs absolute bottom-3 right-3'>
					#{issue?.number}
				</p>
				<p className='flex flex-row items-center justify-center gap-1 font-light text-xs absolute bottom-3 left-3'>
					<IoMdTime />
					{issue.created_at
						? formatDistanceToNowStrict(new Date(issue.created_at), {
								addSuffix: true,
							})
						: ''}
				</p>
			</a>
		</div>
	);
}
