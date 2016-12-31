import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export default {
  entry: 'lib/ekarupa.js',
  plugins: [
    babel(babelrc())
  ],
  external: external,
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'ekarupa',
      sourceMap: true
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true
    }
  ]
}
