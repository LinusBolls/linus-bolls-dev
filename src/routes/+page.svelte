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
	<div class="sache">
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<picture class="pb">
			<source type="image/webp" srcset="/linusBollsAvatar.webp" />
			<img
				src="/linusBollsAvatar.png"
				alt="Avatar of Linus Bolls"
				style="width: 100%; height: 100%"
			/>
		</picture>
	</div>

	<div class="ding">
		<BusinessCard vcard={LINUS_BOLLS_VCARD} {properties} {title}>
			<LinusBollsVcardQrCode />
		</BusinessCard>
	</div>
</main>

<style>
	.ding {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-direction: column;
		flex: 1;

		width: calc(100% - 2rem);
		max-width: 70rem;
		margin-bottom: 3rem;
	}
	@media screen and (min-width: 600px) {
		.sache {
			height: calc(15rem + 6rem);
			aspect-ratio: unset !important;
		}
	}
	.sache {
		display: flex;
		align-items: center;
		justify-content: center;

		width: 100%;
		aspect-ratio: 1;
	}
	.pb {
		width: 62.5%;
		max-width: 15rem;
		aspect-ratio: 1;

		box-shadow: var(--boxShadow);

		overflow: hidden;
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
		background-color: var(--notQuiteBlack);

		/* blatantly copied from spotify */
		background: linear-gradient(
			356deg,
			black 0%,
			rgba(25, 25, 25, 1) 35%,
			rgba(75, 75, 75, 1) 100%
		);

		/* uses the red from my hoodie */
		background: linear-gradient(356deg, black 0%, rgb(30, 10, 7) 35%, rgb(91, 28, 21) 100%);
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
