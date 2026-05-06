import { useState } from 'react';
import IssueList from './IssueList';
import useIssues from '../hooks/useIssues';

export default function IssueSearchPage() {
	const [language, setLanguage] = useState<string>('javascript');
	const { loading, data, error } = useIssues(language);

	return (
		<div className='mt-15'>
			<h4 className='mb-3'>
				You are currently searching Github for issues for{' '}
				<span>
					<select
						name='languages'
						id='language-selection'
						value={language}
						onChange={(e) => setLanguage(e.target.value)}
					>
						<option value='javascript'>Javascript</option>
						<option value='python'>Python</option>
						<option value='typescript'>Typescript</option>
						<option value='java'>Java</option>
					</select>
				</span>
			</h4>
			<div>
				{loading && <p>Loading issue</p>}
				{error && <p className='text-red-500'>{error}</p>}
				{!loading && !error && <IssueList issueData={data?.items || null} />}
			</div>
		</div>
	);
}
