<script>
	import Centered from './Centered.svelte';

	const { children } = $props();
</script>

<Centered>
	<div class="grid h-full grid-cols-1 items-center gap-6 pb-10 md:grid-cols-[1fr_2fr]">
		<figure class="flex flex-col items-center justify-center gap-6">
			<img
				src="/gamerbus.png"
				alt="PsioNick Midbus"
				class="aspect-square max-w-1/2 rounded-full shadow-2xl outline-2 outline-accent md:max-w-9/10"
			/>
			<figcaption class="flex gap-4">
				<a
					class="link rounded-md border-t text-2xl font-extralight no-underline"
					href="https://equinoxette.neocities.org/"
					target="_blank">Art by Equinoxette</a
				>
			</figcaption>
		</figure>
		{@render children()}
	</div>
</Centered>
