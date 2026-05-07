export type UserData = {
	name?: string;
	avatar_url?: string;
};

export type GitHubUser = {
	login: string;
	avatar_url: string;
};

export type GithubLabel = {
	id: number;
	color: string;
	name: string;
};

export type CurrentIssueData = {
	name: string;
	title: string;
	description?: string;
	url: string;
	language: string;
	html_url: string;
	created_at: Date;
	number: number;
	user: GitHubUser;
	body?: string;
	labels?: GithubLabel[];
	id: number;
};

export type SingleIssue = {
	issue: CurrentIssueData;
};

export type IssueList = {
	issueData: CurrentIssueData[] | null;
};
