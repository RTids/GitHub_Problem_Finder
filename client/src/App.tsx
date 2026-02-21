import './App.css';
import { useEffect, useState } from 'react';
import UserHomePage from './routes/UserHomePage';
import NavBar from './components/NavBar';
import getUserData from './api/getUserData';

const clientID = import.meta.env.VITE_GITHUB_CLIENT_ID;

function App() {
	const [accessToken, setAccessToken] = useState(
		localStorage.getItem('accessToken') || null,
	);
	const [userData, setUserData] = useState<UserData | null>(null);

	type UserData = {
		name?: string;
	};

	function logInWithGitHub() {
		window.location.assign(
			`https://github.com/login/oauth/authorize?client_id=${clientID}`,
		);
	}

	useEffect(() => {
		const queryString = window.location.search;
		const searchParam = new URLSearchParams(queryString);
		const codeParam = searchParam.get('code');

		if (codeParam && accessToken === null) {
			async function getAccessToken() {
				await fetch(
					`${import.meta.env.VITE_API_BASE_URL}/getAccessToken?code=${codeParam}`,
					{
						method: 'GET',
					},
				)
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						if (data.access_token) {
							localStorage.setItem('accessToken', data.access_token);
							setAccessToken(data.access_token);
						}
					});
			}
			getAccessToken();
		}
	}, [accessToken]);

	useEffect(() => {
		if (!accessToken) return;

		async function fetchUserData() {
			const data = await getUserData();
			setUserData(data);
		}
		fetchUserData();
	}, [accessToken]);

	const logOut = () => {
		localStorage.removeItem('accessToken');
		setAccessToken(null);
	};

	return (
		<div className='w-full flex flex-col justify-center items-center'>
			<NavBar userData={userData} logOut={logOut} logIn={logInWithGitHub} />
			{accessToken ? (
				<UserHomePage logOut={logOut} userData={userData} />
			) : (
				<>
					<h1>Welcome to the GitHub Problem Finder!</h1>
					<h2>Sign in with Github in the top right to continue.</h2>
				</>
			)}
		</div>
	);
}

export default App;
