import getIssueByLabel from '../api/getIssesByLabel';
import { useState, useEffect } from 'react';
import type { currentIssueData } from '../types';

export default function NewIssue() {
	const [issueData, setIssueData] = useState<IssueData | null>(null);
	const [currentIssue, setCurrentIssue] = useState<currentIssueData | null>(
		null,
	);
	const [language, setLanguage] = useState<string | null>(null);
	const [loading, setLoading] = useState<Loading | true>(true);

	type IssueData = {
		items?: Array<object>;
	};

	type Loading = boolean;

	useEffect(() => {
		async function fetchIssueData() {
			const issues = await getIssueByLabel();
			setIssueData(issues);
			setCurrentIssue(issues.items[0]);
			setLoading(false);
		}
		fetchIssueData();
	}, []);

	console.log(currentIssue);

	return (
		<>
			<h4>You are currently searching Github for issues...</h4>
			<div>
				{loading ? (
					<p>Loading issue</p>
				) : (
					<div>
						<p>{currentIssue?.title}</p>
						<a href={currentIssue?.html_url} target='_blank'>
							Link to problem.
						</a>
					</div>
				)}
			</div>
		</>
	);
}
