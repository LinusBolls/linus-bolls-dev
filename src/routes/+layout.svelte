<script>
	import { SvelteToast } from '@zerodevx/svelte-toast';

	import './styles.css';
</script>

<div class="app">
	<!-- <Header /> -->

	<main>
		<slot />
	</main>

	<!-- <Footer /> -->
</div>

<style>
	* {
		box-sizing: border-box;
	}
	.app {
		display: flex;
		flex-direction: column;
		align-items: center;

		width: 100vw;
		height: 100vh;
	}

	main {
		display: flex;
		flex-direction: column;
		flex: 1;

		width: calc(100% - 2rem);
		max-width: 70rem;
	}
</style>
