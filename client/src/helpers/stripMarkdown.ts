//Function to string the markdown on text
export default function stripMarkdown(text: string): string {
	return text
		.replace(/#{1,6}\s/g, '') // removes ## headings
		.replace(/\*\*(.*?)\*\*/g, '$1') // removes **bold**
		.replace(/\n/g, ' ') // removes line breaks
		.replace(/<[^>]*>/g, '') // removes <any> html tags
		.trim();
}
