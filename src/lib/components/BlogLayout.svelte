<script lang="ts">
	import BlogScrollbar from './BlogScrollbar.svelte';
	import Centered from './Centered.svelte';

	const { children } = $props();
</script>

<!-- <BlogScrollbar> -->
<Centered>
	<div class="blog">
		{@render children()}
	</div>
</Centered>
<!-- </BlogScrollbar> -->
