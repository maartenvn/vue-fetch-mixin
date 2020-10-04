import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import pkg from "./package.json";

export default {
    input: `src/index.js`,
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true,
            exports: "auto"
        },
        {
            file: pkg.module,
            format: "esm",
            sourcemap: true
        },
        {
            file: pkg.browser,
            name: "vue-fetch-mixin",
            format: "umd",
            sourcemap: true
        },

        {
            file: pkg.unpkg,
            name: "vue-fetch-mixin",
            format: "umd",
            sourcemap: true
        }
    ],
    watch: {
        include: "src/**"
    },
    plugins: [
        resolve(),

        // Allow transpiling to older ES versions
          babel({
            babelrc: false,
            presets: [
                [
                    "@babel/preset-env",
                    {
                        modules: false
                    }
                ]
            ]
        }),

        // Minify the bundle
        terser()
    ]
};
