<script lang="ts">
	import BlogScrollbar from './BlogScrollbar.svelte';
	import Centered from './Centered.svelte';
	import TableOfContents from './TableOfContents.svelte';
	import type { Action } from 'svelte/action';
	import type { BlogHeading } from '../types';

	let blogHeadings: BlogHeading[] = $state([]);
	let activeHeadingId = $state('');

	let prevActiveHeadingStorageBinding = 'activeHeadingId';

	/* Persist active heading across page reloads, but not when the tab is closed */
	$effect(() => {
		if (activeHeadingId) {
			sessionStorage.setItem(prevActiveHeadingStorageBinding, JSON.stringify(activeHeadingId));
		}
	});

	/* Assign unique IDs to each heading so Table of Contents can jump to them */
	const getHeadings: Action = (blog) => {
		/* Observe blog headings that are visible on the screen */
		const headingIntersectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeHeadingId = entry.target.id;
					}
				});
			},
			/* Have to put root: null because the scroller is the root, not the blog */
			/* When the scrollbar goes on the blog itself, change this to the blog element */
			{ root: null, rootMargin: '0px 0px -85% 0px', threshold: 0.8 }
		);

		const headings = blog.querySelectorAll('h1, h2, h3, h4, h5, h6');
		const headingsCache: BlogHeading[] = [];
		headings.forEach((heading, i) => {
			if (i == 1) return; // Skip the date
			heading.id = `blog-heading-${i + 1}`;
			heading.classList.add('blog-heading');
			headingsCache.push({
				id: heading.id,
				text: heading.textContent ?? `Heading ${i + 1}`,
				level: parseInt(heading.tagName[1])
			});

			headingIntersectionObserver.observe(heading);
		});
		blogHeadings = headingsCache;

		activeHeadingId =
			JSON.parse(sessionStorage.getItem(prevActiveHeadingStorageBinding) ?? JSON.stringify('')) ??
			activeHeadingId;

		return {
			destroy() {
				headingIntersectionObserver?.disconnect();
			}
		};
	};

	const { children } = $props();
</script>

<!-- <BlogScrollbar> -->
<Centered>
	<div id="blog">
		<div use:getHeadings id="blog-content" class="inline-block w-full md:w-2/3">
			{@render children()}
		</div>
		<div
			id="blog-toc"
			class="invisible fixed mt-2 ml-4 inline-block w-1/4 align-top md:visible"
			role="doc-toc"
		>
			<TableOfContents headings={blogHeadings} bind:activeId={activeHeadingId} />
		</div>
	</div>
</Centered>
<!-- </BlogScrollbar> -->
