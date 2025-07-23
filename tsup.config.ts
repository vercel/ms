import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/ms.ts"],
	format: ["cjs", "esm"],
	dts: true,
	sourcemap: true,
	clean: true,
	minify: true,
});
