const fs = require("fs");
const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");

if (!fs.existsSync("./dist/")) {
    fs.mkdirSync("./dist/");
}

if (!fs.existsSync("./dist/bundle")) {
    fs.mkdirSync("./dist/bundle");
}

fs.copyFile("./www/index.html", "./dist/index.html", (err) => {
    if (err) throw err;
});

esbuild.build({
    entryPoints: ["./src/bundle.js"],
    mainFields: ["svelte", "browser", "module", "main"],
    conditions: ["svelte", "browser"],
    outdir: "./dist/bundle",
    format: "esm",
    logLevel: "info",
    minify: true,
    bundle: true,
    splitting: true,
    sourcemap: "inline",
    plugins: [sveltePlugin()],
});
