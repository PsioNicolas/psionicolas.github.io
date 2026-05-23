<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';

	let { children } = $props();

	const nav = [
		{ id: 1, name: 'Home', url: '/' },
		{ id: 2, name: 'Projects', url: '/projects' }
	] as const;
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<nav class="flex gap-2">
	{#each nav as item (item.id)}
		<a href={resolve(item.url)}>{item.name}</a>
	{/each}
</nav>

{@render children()}
