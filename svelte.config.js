import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// Cloudflare Pages has a number of reserved "_" paths (_headers, _redirects, _routes.json, etc).
		// Using the default SvelteKit appDir of "_app" can lead to assets not being served.
		// Rename it to avoid collisions.
		appDir: 'app',
		base: '/',
		adapter: adapter({
			runtime: 'edge'
		})
	}
};

export default config;
