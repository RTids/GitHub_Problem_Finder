// UserHomePage.tsx
import type { UserData } from '../types';
import IssueSearchPage from '../components/IssueSearchPage';

type UserHomePageProps = {
	logOut: () => void;
	userData: UserData | null;
};

export default function UserHomePage({ logOut, userData }: UserHomePageProps) {
	return (
		<div className='w-full'>
			<IssueSearchPage />
			<button onClick={logOut}>Log Out</button>
		</div>
	);
}
