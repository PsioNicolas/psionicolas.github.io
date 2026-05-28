<script lang="ts">
	import type { HeadingTree } from '../types';

	const { rootHeading }: { rootHeading: Heading } = $props();
</script>

{#snippet renderHeading(heading: HeadingTree)}
	<li id="blog_section_{heading.id}">
		<a href="#blog_section_{heading.id}">{heading.text}</a>
	</li>
{/snippet}

{#snippet tableOfContents(rootHeading: HeadingTree)}
	<ul>
		{@render renderHeading(rootHeading)}
		{#each rootHeading.subHeadings as subHeading (subHeading.id)}
			<li class="pl-8">{@render tableOfContents(subHeading)}</li>
		{/each}
	</ul>
{/snippet}

{@render tableOfContents(rootHeading)}
