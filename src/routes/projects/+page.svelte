<script lang="ts">
	import { resolve } from '$app/paths';
	import Centered from '$lib/components/Centered.svelte';

	const projects = [
		{
			id: 1,
			name: 'gameboy-emu',
			url: '/gameboy',
			description: 'Gameboy emulator written in C.'
		},
		{
			id: 2,
			name: 'This website',
			url: '/this-website',
			description: 'The making of this website.'
		},
		{
		    id: 3,
			name: 'Playing 100 (?) Short Indie Games',
			url: '/indie-games',
			description: 'Weaning inspiration from short indie games to make my own.'
		}
	] as const;
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<Centered>
	<h1 class="mb-4">Projects</h1>
	<ul class="flex-col gap-2">
		{#each projects as project (project.id)}
			<li>
				<svg
					class="inline fill-content pt-3"
					viewBox="0 0 17 17"
					width="32px"
					height="32px"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"
					><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g><g id="SVGRepo_iconCarrier">
						<path
							d="M15 7.5c0 3.033-2.467 5.5-5.5 5.5h-2.912l2.646 2.646-0.707 0.707-3.853-3.853 3.854-3.854 0.707 0.707-2.647 2.647h2.912c2.481 0 4.5-2.019 4.5-4.5s-2.019-4.5-4.5-4.5h-7.083v-1h7.083c3.033 0 5.5 2.467 5.5 5.5z"
						></path>
					</g></svg
				>
				<a class="link" href={resolve(`/projects${project.url}`)}>
					{project.name}
				</a>
				<p class="pl-9">{project.description}</p>
			</li>
		{/each}
	</ul>
</Centered>
