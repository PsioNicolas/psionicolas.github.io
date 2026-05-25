import { escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

interface CodeBlockParams {
	showLineNumbers: boolean;
}

const theme = 'github-dark';
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ['c', 'cpp', 'python', 'lua', 'javascript', 'typescript']
});

export async function codeHighlighter(code: string, lang: string, meta: string) {
	const params = meta?.split(' ') || [];
	console.log(params);
	const html = escapeSvelte(highlighter.codeToHtml(code, { lang: lang || 'text', theme }));
	return `{@html \`${html}\` }`;
}
