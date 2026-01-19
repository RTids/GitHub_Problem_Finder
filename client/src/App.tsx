import './App.css';
import { useEffect, useState } from 'react';
import UserHomePage from './routes/UserHomePage';

const clientID = import.meta.env.VITE_GITHUB_CLIENT_ID;

//Todo
//Set different pages for each page in routes folder

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
						console.log(data);
						if (data.access_token) {
							localStorage.setItem('accessToken', data.access_token);
							setAccessToken(data.access_token);
						}
					});
			}
			getAccessToken();
		}
	}, []);

	useEffect(() => {
		if (!accessToken) return;

		async function fetchUserData() {
			await fetch(`${import.meta.env.VITE_API_BASE_URL}/getUserData`, {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				},
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
					setUserData(data);
				});
		}

		fetchUserData();
	}, [accessToken]);

	const logOut = () => {
		localStorage.removeItem('accessToken');
		setAccessToken(null);
	};

	return (
		<div>
			<header>Welcome to GitHub Problem Finder</header>
			{accessToken ? (
				<UserHomePage logOut={logOut} userData={userData} />
			) : (
				<>
					<button onClick={logInWithGitHub}>Sign In with GitHub modal</button>
				</>
			)}
		</div>
	);
}

export default App;
