// UserHomePage.tsx
import type { UserData } from '../types';
import NewIssue from '../components/NewIssue';

type UserHomePageProps = {
	logOut: () => void;
	userData: UserData | null;
};

export default function UserHomePage({ logOut, userData }: UserHomePageProps) {
	return (
		<>
			<NewIssue />
			<button onClick={logOut}>Log Out</button>
		</>
	);
}
