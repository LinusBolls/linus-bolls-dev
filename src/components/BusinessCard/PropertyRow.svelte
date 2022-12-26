<script lang="ts">
	import { Ripple } from 'svelte-toolbox';

	import Copy from '../../components/icons/Copy.svelte';

	export let key: string;
	export let value: string;
	export let href: string;

	const tooltip = key + ': ' + value;

	/**
	 * urls with a protocol other than https should be opened in the same tab ("_self"),
	 * otherwise it opens an empty tab.
	 */
	const linkTarget = href.startsWith('https://') ? '_blank' : '_self';

	function handleClick() {
		window.open(href, linkTarget);
	}
	function copyToClipboard(data: string) {
		navigator.clipboard.writeText(data).then(
			() => {},
			(err) => {
				console.error('Failed to copy data to clipboard: ', err);
			}
		);
	}
</script>

<Ripple color="white" on:rippleEnded={handleClick}>
	<button class="propertyRow" role="link" title={tooltip}>
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
	.propertyRow:hover :global(svg) {
		fill: var(--propertyColorHover);
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

		width: 100%;
		height: 3rem;

		text-decoration: underline;

		color: var(--propertyColorDefault);

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
	.propertyRow:hover {
		background: var(--propertyBackgroundHover);

		border-left: var(--borderRadius) solid var(--propertyBorderHover) !important;
		border-right-width: 0px !important;

		color: var(--propertyColorHover);
		text-decoration-color: var(--propertyColorHover) !important;
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

	.propertyRow:not(:hover) .squareButton {
		opacity: 0;
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
