<script lang="ts">
	import BusinessCard from '../components/BusinessCard/index.svelte';
	import LinusBollsVcardQrCode from '../components/qrCodes/LinusBollsVcard.svelte';
	import Email from '../components/icons/Email.svelte';
	import Paypal from '../components/icons/Paypal.svelte';
	import Signal from '../components/icons/Signal.svelte';
	import Github from '../components/icons/Github.svelte';
	import Location from '../components/icons/Location.svelte';

	const LINUS_BOLLS_VCARD = `BEGIN:VCARD
VERSION:3.0
N;CHARSET=UTF-8:Bolls;Linus;;;
FN;CHARSET=UTF-8: Linus Bolls
URL;PRIVATE:https://linus.bolls.dev
EMAIL;type=HOME:linus@bolls.dev
TEL;type=HOME;VOICE:+49 176 42004388
ADR;CHARSET=UTF-8;HOME;type=pref:;;Warschauer Straße 06;Berlin;;10243;Germany
LABEL;HOME;PREF;ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:Warschauer Straße 06=0D=0A=
10243 Berlin Germany
REV:2022-12-25T20:14:21+01:00
END:VCARD`;

	const properties = [
		{
			key: 'Email',
			value: 'linus@bolls.dev',
			href: 'mailto:linus@bolls.dev',
			icon: Email
		},
		{
			key: 'Signal',
			value: '+49 176 42004388',
			href: 'tel:+4917642004388',
			icon: Signal
		},
		{
			key: 'Paypal',
			value: 'https://paypal.me/LinusBolls',
			href: 'https://paypal.me/LinusBolls',
			icon: Paypal
		},
		{
			key: 'Github',
			value: 'https://github.com/LinusBolls',
			href: 'https://github.com/LinusBolls',
			icon: Github
		},
		{
			key: 'Address',
			value: 'Warschauer Straße 6, 10243 Berlin, Germany',
			href: 'https://goo.gl/maps/ErcwJKYxtSTEN6jP8',
			icon: Location
		}
	];
	const title = 'Linus Alexander Bolls';

	const metaDescription = properties.map((i) => i.key).join(', ');
</script>

<svelte:head>
	<title>Linus Bolls - Contact Info</title>
	<meta name="description" content={metaDescription} />
</svelte:head>

<main>
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<picture class="pb">
		<source type="image/webp" srcset="/linusBollsAvatar.webp" />
		<img
			src="/linusBollsAvatar.png"
			alt="Avatar of Linus Bolls"
			style="width: 100%; height: 100%"
		/>
	</picture>

	<BusinessCard vcard={LINUS_BOLLS_VCARD} {properties} {title}>
		<LinusBollsVcardQrCode />
	</BusinessCard>
</main>

<style>
	.pb {
		width: 66%;
		max-width: 15rem;
		aspect-ratio: 1;

		margin-bottom: 3rem;

		border: var(--borderRadius) solid white;
	}
	* {
		box-sizing: border-box;
	}
	:root {
		--notQuiteBlack: #090909;

		--propertyColorDefault: #aaa;
		--propertyColorHover: #fff;
		--propertyBorderHover: #fff;
		--propertyBackgroundHover: none;

		--qrColor: #fff;
		--qrAccentColor: #fff;

		--headingColor: white;
		--buttonBackground: white;

		--tooltipBackground: #262626;
		--tooltipColor: #f9f9f9;

		--propertyTransitionDuration: 0.05s;
		--boxShadow: 0 0 16px 0 rgba(0, 0, 0, 0.5);
		--borderRadius: 2px;
	}
	:global(body) {
		background: var(--notQuiteBlack);
	}
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		width: 100%;
		height: 100%;
	}
</style>
