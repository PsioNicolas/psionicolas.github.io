<script lang="ts">
	import BlogScrollbar from './BlogScrollbar.svelte';
	import Centered from './Centered.svelte';
	import TableOfContents from './TableOfContents.svelte';
	import type { Action } from 'svelte/action';
	import type { BlogHeading } from '../types';

	let blogHeadings: BlogHeading[] = $state([]);

	/* Assign unique IDs to each heading so Table of Contents can jump to them */
	const getHeadings: Action = (blog) => {
		const headings = blog.querySelectorAll('h1, h2, h3, h4, h5, h6');
		const headingsCache: BlogHeading[] = [];
		headings.forEach((heading, i) => {
			heading.id = `blog-heading-${i + 1}`;
			headingsCache.push({
				id: heading.id,
				text: heading.textContent ?? `Heading ${i + 1}`,
				level: parseInt(heading.tagName[1])
			});
		});
		blogHeadings = headingsCache;
	};

	const { children } = $props();
</script>

<!-- <BlogScrollbar> -->
<Centered>
	<div id="blog">
		<div use:getHeadings id="blog_content" class="inline-block w-2/3">
			{@render children()}
		</div>
		<div id="blog_toc" class="fixed inline-block w-1/4 align-top" role="doc-toc">
			<TableOfContents headings={blogHeadings} />
		</div>
	</div>
</Centered>
<!-- </BlogScrollbar> -->
