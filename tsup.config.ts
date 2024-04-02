import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['./index.js'],
    format: ['cjs', 'esm'],
    splitting: false,
    sourcemap: false,
    clean: true,
    noExternal: [/(.*)/],
})