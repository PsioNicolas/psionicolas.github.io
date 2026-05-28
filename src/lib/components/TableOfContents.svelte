<script lang="ts">
	import type { BlogHeading } from '../types';
	import ToCHeading from './ToCHeading.svelte';

	let { headings, activeId = $bindable() }: { headings: BlogHeading[]; activeId: string } =
		$props();
</script>

<ul class="flex flex-col gap-2">
	{#each headings as heading (heading.id)}
		<ToCHeading {heading} bind:activeId />
	{/each}
</ul>
