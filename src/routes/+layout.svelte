<script lang="ts">
	import './layout.css';
	import 'prismjs/themes/prism-tomorrow.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import LightDarkToggle from '$lib/components/LightDarkToggle.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Nav />
<div class="fixed bottom-8 left-8 flex">
	<LightDarkToggle />
</div>
<main id="content" class="p-4">
	{@render children()}
</main>
