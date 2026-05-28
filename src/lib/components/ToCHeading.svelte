<script lang="ts">
	import type { BlogHeading } from '../types';

	let { heading, activeId = $bindable() }: { heading: BlogHeading; activeId: string } = $props();
</script>

<li style="padding-left: {heading.level * 1.5}rem">
	<a
		href="#{heading.id}"
		class="rounded-sm font-light text-surface hover:border-b-2 {heading.id === activeId
			? 'border-b-2'
			: ''}"
		onclick={() => (activeId = heading.id)}>{heading.text}</a
	>
</li>
