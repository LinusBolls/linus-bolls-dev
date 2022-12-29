// // import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-node';
// import { vitePreprocess } from '@sveltejs/kit/vite';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
// 	// for more information about preprocessors
// 	preprocess: vitePreprocess(),

// 	kit: {
// 		adapter: adapter({ out: "dist" })
// 	}
// };

// export default config;

import preprocess from "svelte-preprocess";
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'dist',
			assets: 'dist',
			fallback: null,
		}),
		csp: {
			mode: "auto",
			directives: {
				"script-src": ["self", "unsafe-inline"],
			},
		},
	},
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],
};
export default config;
