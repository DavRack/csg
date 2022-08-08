import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const production = process.argv.includes("build");
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
    preprocess({
      postcss: true
    }),
  ],

	kit: {
		adapter: adapter({
      pages: 'docs',
      assets: 'docs',
      fallback: null,
      precompress: false
    }),
    prerender: {
      // This can be false if you're using a fallback (i.e. SPA mode)
      default: true,
      entries: [],
    },
    paths: {base: production? "/mini-apps" : "" },
    appDir: 'internal',
	}
};

export default config;
