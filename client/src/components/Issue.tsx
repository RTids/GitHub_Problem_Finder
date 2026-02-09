import type { currentIssueData } from '../types';

type IssueProps = {
	currentIssue: currentIssueData | null;
	nextIssue: () => void;
	prevIssue: () => void;
};

export default function Issue({
	currentIssue,
	nextIssue,
	prevIssue,
}: IssueProps) {
	return (
		<div>
			<div>
				<h3>{currentIssue?.title}</h3>
				<p>{currentIssue?.description}</p>
				<a target='_blank' href={currentIssue?.html_url}>
					Link to issue
				</a>
			</div>
			<button onClick={prevIssue}>Previous Issue</button>
			<button onClick={nextIssue}>Next Issue</button>
		</div>
	);
}
