import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import uglify from 'rollup-plugin-uglify';

let isProd = process.env.NODE_ENV === 'production';

let plugins = [
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs(),
    resolve()
];

if (!isProd) {
    plugins.push(sourceMaps());
}

if (isProd) {
    plugins.push(uglify());
}

export default {
    input: 'src/index.ts',
    output: [
        {
            file: `./dist/${isProd ? 'tachyon.min.js' : 'tachyon.js'}`,
            name: 'tachyon',
            format: 'umd',
            sourcemap: isProd ? 'false' : 'inline'
        }
    ],
    watch: {
        include: 'src/**'
    },
    plugins: plugins
}