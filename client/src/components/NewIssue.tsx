import getIssueByLabel from '../api/getIssesByLabel';
import { useState, useEffect } from 'react';

export default function NewIssue() {
	const [issueData, setIssueData] = useState<IssueData | null>(null);

	type IssueData = {
		name?: string;
	};

	useEffect(() => {
		async function fetchIssueData() {
			const issues = await getIssueByLabel();
			console.log(issues);
		}
		fetchIssueData();
	}, []);

	return (
		<>
			<h4>You are currently searching Github for issues...</h4>
		</>
	);
}
