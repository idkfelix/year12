import * as esbuild from 'esbuild'
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

let stripNodeColonPlugin = {
  name: 'strip-node-colon',
  setup({ onResolve, onLoad }) {
    onResolve({ filter: /^node:/ }, args => {
      return { path: args.path.slice('node:'.length), external: true }
    })
  }
}

let sveltePlugin = esbuildSvelte({
  compilerOptions: { css:'injected' },
  preprocess: sveltePreprocess(),
})

async function watch(){
  let ctx = await esbuild.context({
    plugins:[
      stripNodeColonPlugin,
      sveltePlugin,
    ],
    entryPoints: ['src/main.js'],
    bundle: true,
    format: "cjs",
    target: "es2018",
    logLevel: "info",
    treeShaking: true,
    outfile: 'main.js',
    external: [
      "obsidian",
    ],
  })
  await ctx.watch()
}
watch()