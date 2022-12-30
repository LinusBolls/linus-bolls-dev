<script>
	import { SvelteToast } from '@zerodevx/svelte-toast';

	import './styles.css';
</script>

<div class="app">
	<!-- <Header /> -->

	<slot />

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
		min-height: 100vh;
	}
</style>
