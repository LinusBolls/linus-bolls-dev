<script>
	import { onMount } from 'svelte';

	export let codeValue;
	export let squareSize;

	let qrcode;

	onMount(() => {
		let script = document.createElement('script');
		script.src = 'https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js';
		document.head.append(script);

		script.onload = function () {
			qrcode = new QRCode('qrcode', {
				text: codeValue,
				width: squareSize,
				height: squareSize,
				colorDark: '#fff',
				colorLight: 'transparent',
				correctLevel: QRCode.CorrectLevel.L
			});
		};
	});
</script>

<div id="qrcode" />

<style>
	#qrcode {
		/* transform: scale(0.8); */
	}
</style>
