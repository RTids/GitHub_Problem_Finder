import { formatDistanceToNowStrict } from 'date-fns';
import type { currentIssueData } from '../types';

//Icons
import { IoMdTime } from 'react-icons/io';

type IssueProps = {
	issue: currentIssueData; // single issue
};

export default function IssueList({ issue }: IssueProps) {
	return (
		<div className='border-2 border-solid border-[#3D444D] h-90 w-70 rounded hover:border-white hover:cursor-pointer relative'>
			<a target='_blank' href={issue?.html_url} className='h-full w-full block'>
				<h1>{issue?.title}</h1>
				<p>{issue?.description}</p>
				<p className='flex flex-row items-center justify-center gap-1 font-light text-xs'>
					<IoMdTime />
					{issue?.created_at
						? formatDistanceToNowStrict(new Date(issue.created_at), {
								addSuffix: true,
							})
						: ''}
				</p>
			</a>
		</div>
	);
}
