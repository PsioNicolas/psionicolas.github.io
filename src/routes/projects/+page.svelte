<script lang="ts">
	import { resolve } from '$app/paths';

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
		}
	] as const;
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<h1 class="mb-4">Projects</h1>
<ul class="flex flex-col gap-2">
	{#each projects as project (project.id)}
		<li>
			<a
				class="rounded-md p-0.5 text-blue-400 underline hover:bg-amber-200"
				href={resolve(`/projects${project.url}`)}
			>
				{project.name}
			</a>
			<p>{project.description}</p>
		</li>
	{/each}
</ul>
