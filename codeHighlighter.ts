import { escapeSvelte } from 'mdsvex';
import { codeToHtml, type BundledTheme, type BundledLanguage } from 'shiki';
import { transformerNotationHighlight, transformerNotationDiff } from '@shikijs/transformers';

/*
 * Parameters listed after the language in the markdown code block
 */
interface CodeBlockParams {
	theme: BundledTheme;
	title?: string;
	showLineNumbers?: boolean;
	startingLineNumber?: number;
}

const defaultStartLine = 1;
const defaultTheme = 'github-dark';

/*
 * MDsveX code highlighter
 * code: Plain text of code to highlight
 * lang: Language specified in the markdown code block
 * meta: Other parameters listed after the language (ex. theme=github-dark)
 */
export default async function codeHighlighter(code: string, lang: BundledLanguage, meta: string) {
	const paramsArray = meta?.split(' ') || [];

	const params: CodeBlockParams = {
		startingLineNumber: defaultStartLine,
		theme: defaultTheme
	};

	for (const param of paramsArray) {
		const [key, value] = param.split('=');

		switch (key) {
			case 'title':
				params.title = value;
				break;
			case 'showLineNumbers':
				params.showLineNumbers = true;
				break;
			case 'startingLineNumber':
				params.startingLineNumber = parseInt(value);
				break;
			case 'theme':
				params.theme = value as BundledTheme;
				break;
		}
	}

	const html = escapeSvelte(
		await codeToHtml(code, {
			lang,
			theme: params.theme,
			transformers: [transformerNotationHighlight(), transformerNotationDiff()]
		})
	);

	return `<div class="code-block">{@html \`${html}\` }</div>`;
}
