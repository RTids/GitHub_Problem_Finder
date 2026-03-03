import { franc } from 'franc';

interface Issue {
	title?: string;
	[key: string]: any; // keep other fields flexible
}

export default async function checkEnglish(issues: Issue[]) {
	const nonEnglishLang = ['kor', 'jpn', 'chi', 'rus'];
	const filteredArray: Issue[] = [];
	for (let issue of issues) {
		if (!issue.title) continue;
		if (issue.title.length < 2) continue;
		if (!nonEnglishLang.includes(franc(issue.title))) filteredArray.push(issue);
	}
	return filteredArray;
}
