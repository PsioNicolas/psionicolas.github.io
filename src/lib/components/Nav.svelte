<script lang="ts">
	import { resolve } from '$app/paths';

	const nav = [
		{ id: 1, name: 'Home', url: '/' },
		{ id: 2, name: 'Projects', url: '/projects' },
		{ id: 3, name: 'AMVs', url: '/amvs' },
		{ id: 4, name: 'Resume', url: '/resume.pdf' }
	] as const;
</script>

<div class="sticky top-0 z-10 bg-white">
	<div class="relative overflow-hidden">
		<div class="absolute inset-0 -z-1 h-full w-full bg-blue-200 mask-radial-from-blue-100"></div>
		<nav class="flex justify-center gap-8 p-4 text-xl font-thin text-blue-700 shadow-xl/3">
			{#each nav as item (item.id)}
				<a class="hover:text-black" href={resolve(item.url)}>{item.name}</a>
			{/each}
		</nav>
	</div>
</div>
