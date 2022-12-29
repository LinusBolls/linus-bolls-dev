<script lang="ts">
	import PropertyRow from './PropertyRow.svelte';

	import QrCode from '../../components/icons/QrCode.svelte';
	import Email from '../../components/icons/Email.svelte';
	import Paypal from '../../components/icons/Paypal.svelte';
	import Signal from '../../components/icons/Signal.svelte';
	import Github from '../../components/icons/Github.svelte';
	import Location from '../../components/icons/Location.svelte';
	import TooltipMouthpiece from '../../components/icons/TooltipMouthpiece.svelte';
	import type { ComponentType } from 'svelte';

	interface Property {
		href: string;
		key: string;
		value: string;
		icon: ComponentType;
	}
	export let vcard: string;
	export let properties: Property[];
	export let title: string;

	const vcardUri = `data:text/vcard;charset=UTF-8,${encodeURIComponent(vcard)}`;

	function downloadURI(uri: string, name: string) {
		const link = document.createElement('a');

		link.setAttribute('download', name);
		link.href = uri;

		document.body.appendChild(link);

		link.click();
		link.remove();
	}
	function addToContacts() {
		downloadURI(vcardUri, 'Linus Bolls.vcf');
	}
	const activeProperties = properties.map(() => false);

	async function ripple() {
		for (const idx of activeProperties.keys()) {
			setTimeout(() => (activeProperties[idx] = true), idx * 50 + 50);
			setTimeout(() => (activeProperties[idx] = false), idx * 70 + 70);
		}
	}
	// setTimeout(ripple, 100);
</script>

<div class="businessCard">
	<h1>{title}</h1>

	<div class="vertical">
		<div class="tooltipContainer qrCodeContainer">
			<div class="tooltip tooltip--left">
				<TooltipMouthpiece />
				<QrCode />
				<span>Scan to add to contacts</span>
			</div>
			<slot />
		</div>
		<div class="propertyContainer">
			{#each properties as { key, value, href, icon }, idx}
				<PropertyRow {key} {value} {href} isActive={activeProperties[idx]}>
					<svelte:component this={icon} />
				</PropertyRow>
			{/each}
		</div>
	</div>
	<button class="button secondary" on:click={addToContacts}>Add to contacts</button>
</div>

<style>
	* {
		box-sizing: border-box;
	}
	.businessCard {
		position: relative;
		display: flex;
		flex-direction: column;

		width: fit-content;
		gap: 1rem;
	}
	h1 {
		color: var(--headingColor);

		font-size: 2rem;
		line-height: 2rem;

		margin: 0;

		font-weight: bold;

		text-align: start;

		letter-spacing: 1px;
	}
	.vertical {
		display: flex;

		width: 100%;
		gap: 1rem;
	}
	.qrCodeContainer {
		display: none !important;

		height: 100%;
		aspect-ratio: 1;
	}
	.propertyContainer {
		display: flex;
		flex-direction: column;

		width: 100%;
	}
	.button {
		display: flex;
		align-items: center;
		justify-content: center;

		border-radius: var(--borderRadius);

		cursor: pointer;

		font-size: 1rem;

		font-weight: bold;

		transition-duration: 0.2s;

		width: 100%;
		min-height: 3rem;
		padding: 0;
		margin: 0;
	}
	.button.primary {
		background: var(--buttonBackground);
		color: var(--notQuiteBlack);
		border: none;
	}
	.button.secondary {
		background: none;
		color: var(--buttonBackground);
		border: var(--borderRadius) solid var(--buttonBackground);
	}
	.button.primary:hover {
		filter: brightness(0.8);
	}
	.button.secondary:hover {
		background: var(--buttonBackground);
		color: var(--notQuiteBlack);
	}
	.button:active {
		transform: scale(0.98);
	}
	.tooltipContainer {
		position: relative;
		display: flex;
		align-items: center;
	}
	.tooltipContainer:hover .tooltip {
		opacity: 1;
	}
	.tooltip {
		opacity: 0;

		position: absolute;
		display: flex;
		align-items: center;

		padding: 0.3rem 1rem;
		gap: 0.5rem;

		border-radius: var(--borderRadius);

		background: var(--tooltipBackground);
		color: var(--tooltipColor);
		box-shadow: var(--boxShadow);

		transition-duration: 0.2s;
	}
	.tooltip span {
		white-space: nowrap;
	}
	.tooltip--left {
		right: 100%;
	}
	@media screen and (min-width: 800px) {
		.qrCodeContainer {
			display: flex !important;
		}
		h1 {
			letter-spacing: 2px;

			font-size: 2.5rem;
			line-height: 2.5rem;
		}
		.vertical {
			width: fit-content;
		}
	}
</style>
