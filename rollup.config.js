const riot = require('rollup-plugin-riot')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const buble = require('rollup-plugin-buble')
const postcss = require('postcss')
const postcssCssnext = require('postcss-cssnext')

module.exports = {
    // allowRealFiles: true,
    entry: 'src/scripts/entry.js',
    // dest: 'bundle.js',
    plugins: [
        riot({
            style: 'cssnext',
            parsers: {
                css: { cssnext }
            }
        }),
        nodeResolve({ jsnext: true }),
        commonjs(),
        buble()
    ],
    format: 'iife',
    sourceMap: true
}

function cssnext(tagName, css) {
    css = css.replace(/:scope/g, ':root')
    css = postcss([ postcssCssnext ]).process(css).css
    css = css.replace(/:root/g, ':scope')
    return css
}