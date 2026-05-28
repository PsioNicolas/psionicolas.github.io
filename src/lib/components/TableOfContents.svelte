<script lang="ts">
	import type { BlogHeading } from '../types';
	import ToCHeading from './ToCHeading.svelte';

	let activeHeadingIndex = $state(0);

	const { headings }: { headings: BlogHeading[] } = $props();
</script>

<ul class="flex flex-col gap-2">
	{#each headings as heading, i (heading.id)}
		<ToCHeading {heading} index={i} bind:activeIndex={activeHeadingIndex} />
	{/each}
</ul>
