import {
	FiSearch,
	FiBookmark,
	FiGitPullRequest,
	FiCheckCircle,
	FiZap,
} from 'react-icons/fi';

const sections = [
	{
		icon: <FiZap />,
		title: 'What is GitHub Issue Finder?',
		body: 'A tool that helps developers find beginner-friendly open source issues to contribute to, filterable by programming language. Sign in with GitHub to get started.',
	},
	{
		icon: <FiSearch />,
		title: 'Finding an issue',
		body: 'Use the language filter to narrow results to your preferred stack. Issues are pulled from GitHub and cached for performance. Results are capped at 1,000 due to GitHub API limits.',
	},
	{
		icon: <FiBookmark />,
		title: 'Saving an issue',
		body: 'Click the bookmark icon on any issue card to save it for later. Saved issues are stored in your browser and accessible from the Saved tab in the navbar.',
	},
	{
		icon: <FiGitPullRequest />,
		title: 'Picking up an issue on GitHub',
		body: "Click an issue card to open it on GitHub. Leave a comment saying you'd like to work on it — maintainers will assign it to you. Some repos allow self-assignment via the sidebar.",
	},
	{
		icon: <FiCheckCircle />,
		title: 'Tracking assigned issues',
		body: 'Once a maintainer assigns the issue to your GitHub account, it will appear in your Assigned tab. Track what you have in progress and what you have completed.',
	},
];

export default function GettingStartedPage() {
	return (
		<div className='min-h-screen w-full bg-neutral-50 dark:bg-neutral-950 px-6 py-10'>
			<div className='max-w-2xl mx-auto'>
				{/* Header */}
				<div className='mb-10'>
					<h1 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2'>
						How it works
					</h1>
					<p className='text-sm text-neutral-500 dark:text-neutral-400'>
						Everything you need to find, save, and contribute to open source
						issues.
					</p>
				</div>

				{/* Sections */}
				<div className='flex flex-col'>
					{sections.map((section, index) => (
						<div key={index}>
							<div className='flex gap-4 py-6'>
								<div className='mt-0.5 text-neutral-400 dark:text-neutral-500 text-base shrink-0'>
									{section.icon}
								</div>
								<div>
									<h2 className='text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-1.5'>
										{section.title}
									</h2>
									<p className='text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed'>
										{section.body}
									</p>
								</div>
							</div>
							{index < sections.length - 1 && (
								<hr className='border-neutral-100 dark:border-neutral-800' />
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
