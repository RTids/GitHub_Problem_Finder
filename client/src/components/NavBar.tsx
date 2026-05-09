import type { UserData } from '../types';
import { useDropDown } from '../hooks/useDropDown';
import { Link } from 'react-router-dom';

type NavBarProps = {
	logOut: () => void;
	logIn: () => void;
	userData: UserData | null;
};

export default function NavBar({ userData, logIn, logOut }: NavBarProps) {
	const { isOpen, toggle, close, ref } = useDropDown();
	return (
		<nav className='sticky top-0 z-50 h-14 w-full flex items-center justify-between px-6 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800'>
			{/* Logo */}
			<Link to={'/'}>
				<div className='flex items-center gap-2'>
					<svg
						className='w-5 h-5 text-neutral-900 dark:text-neutral-100'
						fill='currentColor'
						viewBox='0 0 24 24'
						aria-hidden='true'
					>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z'
						/>
					</svg>
					<span className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>
						Issue Finder
					</span>
				</div>
			</Link>

			{/* Right side */}
			<Link
				to='/saved'
				className='text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors'
			>
				Saved Issues
			</Link>

			{userData ? (
				<div className='flex items-center gap-3'>
					<span className='text-sm text-neutral-500 dark:text-neutral-400 hidden sm:block'>
						{userData.name}
					</span>
					<div className='relative' ref={ref}>
						<img
							className='rounded-full h-8 w-8 cursor-pointer ring-1 ring-neutral-200 dark:ring-neutral-700 hover:ring-neutral-400 dark:hover:ring-neutral-500 transition-all'
							src={userData.avatar_url}
							alt={userData.name}
							onClick={toggle}
						/>
						{/* Dropdown */}
						<div
							className={`absolute right-0 top-9 w-36 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm opacity-0 transition-opacity duration-200 ${isOpen ? 'opacity-100 pointer-events-auto hover:cursor-pointer' : 'opacity-0 pointer-events-none'}`}
						>
							<button
								onClick={() => {
									logOut();
									close();
								}}
								className='w-full text-left text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 px-3 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors hover:cursor-pointer'
							>
								Sign out
							</button>
						</div>
					</div>
				</div>
			) : (
				<button
					onClick={logIn}
					className='flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-1.5 transition-colors'
				>
					<svg
						className='w-4 h-4'
						fill='currentColor'
						viewBox='0 0 24 24'
						aria-hidden='true'
					>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z'
						/>
					</svg>
					Sign in with GitHub
				</button>
			)}
		</nav>
	);
}
