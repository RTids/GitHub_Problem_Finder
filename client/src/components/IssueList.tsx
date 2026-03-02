import type { currentIssueData } from '../types';
import Issue from './Issue';

type IssueListProps = {
	issueData: currentIssueData[] | null;
};

export default function IssueList({ issueData }: IssueListProps) {
	if (!issueData || issueData.length === 0) return <p>No issues found</p>;

	return (
		<div className='flex flex-row items-center flex-wrap justify-center gap-8 bg-[#212830] pt-5 pb-5'>
			{issueData?.map((issue, index) => {
				return <Issue key={index} issue={issue} />;
			})}
		</div>
	);
}
