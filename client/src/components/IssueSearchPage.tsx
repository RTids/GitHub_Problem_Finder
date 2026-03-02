import getIssueByLabel from '../api/getIssesByLabel';
import { useState, useEffect } from 'react';
import type { currentIssueData } from '../types';
import IssueList from './IssueList';

export default function IssueSearchPage() {
	const [issueData, setIssueData] = useState<IssueData | null>(null);
	const [language, setLanguage] = useState<string>('javascript');
	const [loading, setLoading] = useState<Loading | true>(true);

	type IssueData = {
		items?: currentIssueData[];
	};

	type Loading = boolean;

	useEffect(() => {
		async function fetchIssueData() {
			const issues = await getIssueByLabel(language);
			setIssueData(issues);
			setLoading(false);
		}
		fetchIssueData();
	}, [language]);

	return (
		<div className='mt-15'>
			<h4>
				You are currently searching Github for issues for
				<select
					name='languages'
					id='language-selection'
					value={language}
					onChange={(e) => setLanguage(e.target.value)}
				>
					<option value='javascript'>Javascript</option>
					<option value='python'>Python</option>
				</select>
			</h4>
			<div>
				{loading ? (
					<p>Loading issue</p>
				) : (
					<IssueList issueData={issueData?.items || null} />
				)}
			</div>
		</div>
	);
}
