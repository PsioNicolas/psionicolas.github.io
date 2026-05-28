<script lang="ts">
	import type { BlogHeading } from '../types';

	let {
		heading,
		index,
		activeIndex = $bindable()
	}: { heading: BlogHeading; index: number; activeIndex: number } = $props();
</script>

<li style="padding-left: {heading.level * 1.5}rem">
	<a
		href="#{heading.id}"
		class="rounded-sm font-light text-surface hover:border-b-2 {index === activeIndex
			? 'border-b-2'
			: ''}"
		onclick={() => (activeIndex = index)}>{heading.text}</a
	>
</li>
