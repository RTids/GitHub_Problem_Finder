import type { UserData } from '../types';

type NavBarProps = {
	logOut: () => void;
	userData: UserData | null;
};

export default function NavBar({ userData, logOut }: NavBarProps) {
	return (
		<nav className='fixed top-0 h-32 w-full flex flex-row justify-around items-center'>
			<div className='w-100'></div>
			<h1 className='w-100'>GitHub Problem Finder</h1>
			<div className='w-100'>
				{userData ? (
					<div className='flex flex-row justify-between items-center'>
						<div></div>
						<div className='flex flex-row justify-evenly items-center gap-5'>
							<h3>{userData.name}</h3>
							<img
								className='rounded-full h-16 w-16 cursor-pointer'
								src={userData?.avatar_url}
							></img>
						</div>
					</div>
				) : (
					<button>Log In</button>
				)}
			</div>
		</nav>
	);
}
