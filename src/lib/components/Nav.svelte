<script lang="ts">
	import { resolve } from '$app/paths';

	const nav = [
		{ id: 1, name: 'Home', url: '/' },
		{ id: 2, name: 'Projects', url: '/projects' },
		{ id: 3, name: 'AMVs', url: '/amvs' },
		{ id: 4, name: 'Resume', url: '/resume.pdf' }
	] as const;
</script>

<!-- https://www.fffuel.co/aaabstract/ -->
<div class="sticky top-0 z-10 bg-white">
	<div class="relative overflow-hidden">
		<div class="infinite-scroll absolute inset-0 -z-1 h-full w-full">
			<!-- Watercolors -->
			<div
				class="absolute -top-10 -left-10 h-[400px] w-[400px] animate-pulse rounded-full bg-pink-500/50 mix-blend-screen blur-[80px]"
			></div>
			<div
				class="absolute top-1/4 -right-20 h-[500px] w-[500px] rounded-full bg-indigo-500/40 mix-blend-screen blur-[100px]"
			></div>
			<div
				class="absolute bottom-0 left-1/4 h-[450px] w-[450px] rounded-full bg-teal-500/40 mix-blend-screen blur-[90px]"
			></div>
		</div>
		<nav class="flex flex-wrap justify-center gap-12 p-4 text-xl font-thin text-blue-700 shadow-xl">
			{#each nav as item (item.id)}
				<a class="hover:text-black" href={resolve(item.url)}>{item.name}</a>
			{/each}
		</nav>
	</div>
</div>
