<script lang="ts">
	let dark = $state(false);

	$effect(() => {
		console.log('dark: ', dark);
		if (dark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});

	function toggleDarkMode() {
		dark = !dark;
	}
</script>

{#if dark}
	<button onclick={toggleDarkMode}>
		<!-- https://www.svgrepo.com/svg/513508/sun -->
		<svg
			version="1.0"
			id="Layer_1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 64 64"
			width="64"
			height="64"
			enable-background="new 0 0 64 64"
			xml:space="preserve"
			fill="#000000"
			><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
				id="SVGRepo_tracerCarrier"
				stroke-linecap="round"
				stroke-linejoin="round"
			></g><g id="SVGRepo_iconCarrier">
				<g>
					<g>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							fill="#394240"
							d="M32.003,16.003c-8.837,0-16.001,7.165-16.001,16.001 s7.165,16.001,16.001,16.001s16.001-7.164,16.001-16.001S40.84,16.003,32.003,16.003z M32.003,40.006 c-4.418,0-8.001-3.587-8.001-8.001c0-4.422,3.583-8.001,8.001-8.001s8.001,3.579,8.001,8.001 C40.004,36.419,36.421,40.006,32.003,40.006z"
						></path>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							fill="#394240"
							d="M12.001,31.997c0-2.211-1.789-4-4-4H4c-2.211,0-4,1.789-4,4 s1.789,4,4,4h4C10.212,35.997,12.001,34.208,12.001,31.997z"
						></path>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							fill="#394240"
							d="M12.204,46.139l-2.832,2.829c-1.563,1.562-1.563,4.094,0,5.656 c1.562,1.562,4.094,1.562,5.657,0l2.833-2.828c1.562-1.562,1.562-4.095,0-5.657C16.298,44.576,13.767,44.576,12.204,46.139z"
						></path>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							fill="#394240"
							d="M32.003,51.999c-2.211,0-4,1.789-4,4V60c0,2.211,1.789,4,4,4 s4-1.789,4-4l-0.004-4.001C36.003,53.788,34.21,51.999,32.003,51.999z"
						></path>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							fill="#394240"
							d="M51.798,46.139c-1.559-1.562-4.091-1.562-5.653,0 s-1.562,4.095,0,5.657l2.829,2.828c1.562,1.57,4.094,1.562,5.656,0s1.566-4.094,0-5.656L51.798,46.139z"
						></path>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							fill="#394240"
							d="M60.006,27.997l-4.009,0.008 c-2.203-0.008-3.992,1.781-3.992,3.992c-0.008,2.211,1.789,4,3.992,4h4.001c2.219,0.008,4-1.789,4-4 C64.002,29.786,62.217,27.997,60.006,27.997z"
						></path>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							fill="#394240"
							d="M51.798,17.855l2.828-2.829c1.574-1.562,1.562-4.094,0-5.657 c-1.559-1.563-4.09-1.563-5.652,0l-2.829,2.836c-1.562,1.555-1.562,4.086,0,5.649C47.699,19.426,50.239,19.418,51.798,17.855z"
						></path>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							fill="#394240"
							d="M32.003,11.995c2.207,0.016,4-1.789,4-3.992v-4 c0-2.219-1.789-4-4-4c-2.211-0.008-4,1.781-4,3.993l0.008,4.008C28.003,10.206,29.792,11.995,32.003,11.995z"
						></path>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							fill="#394240"
							d="M12.212,17.855c1.555,1.562,4.079,1.562,5.646-0.008 c1.574-1.547,1.566-4.086,0.008-5.649L15.037,9.37c-1.57-1.571-4.094-1.555-5.657,0c-1.575,1.562-1.575,4.094-0.012,5.657 L12.212,17.855z"
						></path>
					</g>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						fill="#F9EBB2"
						d="M39.996,31.997c0-4.422-3.583-8.001-8.001-8.001 s-8.001,3.579-8.001,8.001c0,4.414,3.583,8.001,8.001,8.001S39.996,36.411,39.996,31.997z"
					></path>
				</g>
			</g></svg
		>
	</button>
{:else}
	<button onclick={toggleDarkMode}>
		<!-- https://www.svgrepo.com/svg/528415/moon -->
		<svg viewBox="0 0 24 24" width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"
			><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
				id="SVGRepo_tracerCarrier"
				stroke-linecap="round"
				stroke-linejoin="round"
			></g><g id="SVGRepo_iconCarrier">
				<path
					opacity="0.5"
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M22 12.0004C22 17.5232 17.5228 22.0004 12 22.0004C10.8358 22.0004 9.71801 21.8014 8.67887 21.4357C8.24138 20.3772 8 19.217 8 18.0004C8 15.7792 8.80467 13.7459 10.1384 12.1762C11.31 13.8818 13.2744 15.0004 15.5 15.0004C17.8615 15.0004 19.9289 13.741 21.0672 11.8572C21.3065 11.4612 22 11.5377 22 12.0004Z"
					fill="#1C274C"
				></path>
				<path
					d="M2 12C2 16.3586 4.78852 20.0659 8.67887 21.4353C8.24138 20.3768 8 19.2166 8 18C8 15.7788 8.80467 13.7455 10.1384 12.1758C9.42027 11.1303 9 9.86422 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12Z"
					fill="#1C274C"
				></path>
			</g></svg
		>
	</button>
{/if}
