<script lang="ts">
	import type { BlogHeading } from '../types';

	function setActive(e: MouseEvent) {
		const element = e.target as HTMLElement;
		element?.classList.add('active');
	}

	const { headings }: { headings: BlogHeading[] } = $props();
</script>

{#snippet renderHeading(heading: BlogHeading)}
	<li style="padding-left: {heading.level * 1.5}rem">
		<a href="#{heading.id}" class="font-light text-surface hover:underline" onclick={setActive}
			>{heading.text}</a
		>
	</li>
{/snippet}

<ul class="flex flex-col gap-2">
	{#each headings as heading (heading.id)}
		{@render renderHeading(heading)}
	{/each}
</ul>
