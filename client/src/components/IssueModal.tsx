import getIssueByLabel from '../api/getIssesByLabel';
import { useState, useEffect } from 'react';
import type { currentIssueData } from '../types';
import Issue from './Issue';

export default function IssueModal() {
	const [issueData, setIssueData] = useState<IssueData | null>(null);
	const [language, setLanguage] = useState<string | null>(null);
	const [loading, setLoading] = useState<Loading | true>(true);
	const [issueNumber, setIssueNumber] = useState<number>(0);

	type IssueData = {
		items?: currentIssueData[];
	};

	type Loading = boolean;

	useEffect(() => {
		async function fetchIssueData() {
			const issues = await getIssueByLabel();
			setIssueData(issues);
			setLoading(false);
		}
		fetchIssueData();
	}, []);

	function nextIssue() {
		setIssueNumber((prev) =>
			issueData && prev < (issueData.items?.length ?? 1) - 1 ? prev + 1 : prev,
		);
	}

	function prevIssue() {
		setIssueNumber((prev) => (prev > 0 ? prev - 1 : 0));
	}

	const currentIssue = issueData?.items?.[issueNumber] ?? null;

	return (
		<>
			<h4>You are currently searching Github for issues...</h4>
			<div>
				{loading ? (
					<p>Loading issue</p>
				) : (
					<Issue
						currentIssue={currentIssue}
						nextIssue={nextIssue}
						prevIssue={prevIssue}
					/>
				)}
			</div>
		</>
	);
}
