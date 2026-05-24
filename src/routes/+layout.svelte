<script lang="ts">
	import './layout.css';
	import 'prismjs/themes/prism-tomorrow.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';

	let { children } = $props();

	const nav = [
		{ id: 1, name: 'Home', url: '/' },
		{ id: 2, name: 'Projects', url: '/projects' },
		{ id: 3, name: 'AMVs', url: '/amvs' },
		{ id: 4, name: 'Resume', url: '/resume.pdf' }
	] as const;
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<nav class="flex justify-center gap-8 bg-gray-200 p-4 outline-1">
	{#each nav as item (item.id)}
		<a class="hover:text-black" href={resolve(item.url)}>{item.name}</a>
	{/each}
</nav>
<div class="p-4">
	{@render children()}
</div>
