<script lang="ts">
	import Centered from './Centered.svelte';

	const { children } = $props();
</script>

<Centered>
	<div class="blog">
		{@render children()}
	</div>
</Centered>
