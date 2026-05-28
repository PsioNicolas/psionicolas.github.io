<script lang="ts">
	import BlogScrollbar from './BlogScrollbar.svelte';
	import Centered from './Centered.svelte';
	import TableOfContents from './TableOfContents.svelte';
	import type { Action } from 'svelte/action';
	import type { HeadingTree } from '../types';

	const getHeadings: Action = (blog) => {
		const headings = blog.querySelectorAll('h1, h2, h3, h4, h5, h6');

		const tree: HeadingTree = { root: { id: 1, text: 'Heading', subHeadings: [] } };
		let currentLevel = tree.root;
		for (const heading of headings) {
			const level = parseInt(heading.tagName[1]);
			const text = heading.textContent ?? '';
			const id = heading.id ? parseInt(heading.id) : currentLevel.id + 1;

			if (level > currentLevel.subHeadings.length) {
				currentLevel.subHeadings.push({ id, text, subHeadings: [] });
			} else {
				currentLevel = currentLevel.subHeadings[level - 1];
			}
		}
		console.log(tree);
		return { destroy: () => {} };
	};

	const { children } = $props();
</script>

<!-- <BlogScrollbar> -->
<Centered>
	<div id="blog">
		<div use:getHeadings id="blog_content" class="inline-block w-2/3">
			{@render children()}
		</div>
		<div id="blog_toc" class="sticky inline-block w-1/6 align-top" role="doc-toc">
			<TableOfContents
				rootHeading={{
					id: 1,
					text: 'Heading',
					subHeadings: [
						{
							id: 2,
							text: 'Subheading',
							subHeadings: [{ id: 3, text: 'Sub-subheading', subHeadings: [] }]
						}
					]
				}}
			/>
		</div>
	</div>
</Centered>
<!-- </BlogScrollbar> -->
