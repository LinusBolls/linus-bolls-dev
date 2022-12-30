<script lang="ts">
	import { Ripple } from 'svelte-toolbox';

	import Copy from '../../components/icons/Copy.svelte';

	export let key: string;
	export let value: string;
	export let href: string;

	export let isActive = false;

	const tooltip = key + ': ' + value;

	let touchHoldTimer: any;

	function touchStart() {
		touchHoldTimer = setTimeout(() => {
			copyToClipboard(value);
			alert(`Copied '${value}' to clipboard`);
		}, 500);
	}
	function touchEnd() {
		if (touchHoldTimer) clearTimeout(touchHoldTimer);
	}

	// let windowReference = window.open();

	// // later
	// windowReference!.location = url;

	// setTimeout(() => {
	// 	window.open(url, '_blank');
	// });

	/**
	 * urls with a protocol other than https should be opened in the same tab ("_self"),
	 * otherwise it opens an empty tab.
	 */
	const linkTarget = href.startsWith('https://') ? '_blank' : '_self';

	// rel="preconnect"

	function handleClick() {
		setTimeout(() => {
			window.open(href, linkTarget);
		});
	}
	// function copyToClipboard(data: string) {
	// 	navigator.clipboard.writeText(data).then(
	// 		() => {},
	// 		(err) => {
	// 			console.error('Failed to copy data to clipboard: ', err);
	// 		}
	// 	);
	// }
	function copyToClipboard(string: string) {
		let textarea;
		let result;

		try {
			textarea = document.createElement('textarea');
			textarea.setAttribute('readonly', true);
			textarea.setAttribute('contenteditable', true);
			textarea.style.position = 'fixed'; // prevent scroll from jumping to the bottom when focus is set.
			textarea.value = string;

			document.body.appendChild(textarea);

			textarea.focus();
			textarea.select();

			const range = document.createRange();
			range.selectNodeContents(textarea);

			const sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);

			textarea.setSelectionRange(0, textarea.value.length);
			result = document.execCommand('copy');
		} catch (err) {
			console.error(err);
			result = null;
		} finally {
			document.body.removeChild(textarea);
		}

		// manual copy fallback using prompt
		if (!result) {
			const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
			const copyHotkey = isMac ? '⌘C' : 'CTRL+C';
			result = prompt(`Press ${copyHotkey}`, string); // eslint-disable-line no-alert
			if (!result) {
				return false;
			}
		}
		return true;
	}
</script>

<!-- on:touchstart={touchStart}
on:touchend={touchEnd} -->

<Ripple color="white" on:rippleEnded={handleClick}>
	<!-- svelte-ignore a11y-missing-content -->
	<button
		class={'propertyRow' + (isActive ? ' propertyRow--active' : '')}
		role="link"
		title={tooltip}
	>
		<div class="squareIcon">
			<slot />
		</div>
		<span>{value}</span>
		<!-- <button
			class="squareIcon squareButton"
			title={'Copy ' + key}
			on:click|stopPropagation={() => copyToClipboard(value)}
		>
			<Copy />
		</button> -->
	</button>
</Ripple>

<style>
	* {
		box-sizing: border-box;
	}
	.propertyRow :global(svg) {
		fill: var(--propertyColorDefault);

		transition-duration: var(--propertyTransitionDuration);
	}
	.propertyRow span {
		width: 100%;
		text-align: start;
		padding-right: 1rem;
	}
	.squareButton:active {
		transform: scale(0.95);
	}
	.propertyRow {
		position: relative;
		display: flex;
		align-items: center;

		-webkit-user-select: none; /* Chrome all / Safari all */
		-moz-user-select: none; /* Firefox all */
		-ms-user-select: none; /* IE 10+ */
		user-select: none; /* Likely future */

		width: 100%;
		height: 3rem;

		text-decoration: underline;

		color: var(--propertyColorDefault) !important;

		text-decoration-color: var(--propertyColorDefault) !important;

		background: none;

		cursor: pointer;

		border-color: var(--propertyBorderHover);
		border-style: solid;

		border-top: none;
		border-bottom: none;

		border-left-width: 0px;
		border-right: var(--borderRadius) solid transparent !important;

		transition-duration: var(--propertyTransitionDuration);
	}
	.propertyRow:hover,
	.propertyRow.propertyRow--active {
		background: var(--propertyBackgroundHover);

		border-left: var(--borderRadius) solid var(--propertyBorderHover) !important;
		border-right-width: 0px !important;

		color: var(--propertyColorHover) !important;
		text-decoration-color: var(--propertyColorHover) !important;
	}
	.propertyRow:hover :global(svg),
	.propertyRow.propertyRow--active :global(svg) {
		fill: var(--propertyColorHover);
	}
	.propertyRow:not(:hover):not(.propertyRow--active) .squareButton {
		opacity: 0;
	}
	.squareIcon {
		display: flex;
		align-items: center;
		justify-content: center;

		height: 100%;
		aspect-ratio: 1;
	}
	@media screen and (min-width: 800px) {
		.propertyContainer {
			width: fit-content;
		}
	}

	.squareButton {
		position: relative;

		border: none;
		background: none;
		cursor: pointer;

		transition-duration: var(--propertyTransitionDuration);

		border-radius: var(--borderRadius);
	}
	.squareButton:hover {
		background: rgba(255, 255, 255, 0.1);
	}
</style>
