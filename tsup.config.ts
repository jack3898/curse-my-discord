import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	outDir: "dist",
	format: ["esm"],
	clean: true,
	banner: () => ({
		// createRequire2 alias is to prevent any conflicts with other createRequire calls in the bundle
		js: `import { createRequire as createRequire2 } from 'module'; const require = createRequire2(import.meta.url);`,
	}),
	noExternal: [/(.*)/],
});
