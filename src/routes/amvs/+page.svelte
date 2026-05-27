<script lang="ts">
	const amvs = [
		{ id: 1, name: 'Blue Flicks', url: 'https://www.youtube.com/embed/-wLhHVGvxmU' },
		{ id: 2, name: 'The Monster in My Bed', url: 'https://www.youtube.com/embed/CJV89Vu30sc' },
		{ id: 3, name: 'Silver Beret', url: 'https://www.youtube.com/embed/dk75TBkAhzY' },
		{ id: 4, name: 'Planes in the Sky', url: 'https://www.youtube.com/embed/Swa8ePFDf0A' },
		{ id: 5, name: 'I Gave You My Heart', url: 'https://www.youtube.com/embed/F8cO2OfnucY' },
		{ id: 6, name: 'Midnight Sun', url: 'https://www.youtube.com/embed/fXaryzjqf1I' }
	] as const;
</script>

<svelte:head>
	<title>AMVs</title>
</svelte:head>

<div class="grid w-full grid-cols-[repeat(auto-fit,minmax(min(100%,500px),1fr))] gap-8">
	{#each amvs as amv (amv.id)}
		<div class="flex flex-col items-center">
			<h2 class="mb-4 text-primary">{amv.name}</h2>
			<iframe
				class="aspect-video rounded-xl bg-black shadow-xl/20 outline-3 outline-accent"
				allowfullscreen
				title={amv.name}
				src={amv.url}
			></iframe>
		</div>
	{/each}
</div>
