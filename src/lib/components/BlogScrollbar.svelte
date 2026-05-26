<script lang="ts">
	const { children } = $props();
</script>

<!-- https://preline.co/docs/components/custom-scrollbar.html -->
<div
	class="max-h-100 overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-stone-300
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-stone-100
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700"
>
	{@render children()}
</div>
