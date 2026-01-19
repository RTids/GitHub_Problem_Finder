// UserHomePage.tsx
import type { UserData } from '../types';

type UserHomePageProps = {
	logOut: () => void;
	userData: UserData | null;
};

export default function UserHomePage({ logOut, userData }: UserHomePageProps) {
	return (
		<>
			<h1>Hello {userData?.name}. We have the access token.</h1>
			<button onClick={logOut}>Log Out</button>
		</>
	);
}
