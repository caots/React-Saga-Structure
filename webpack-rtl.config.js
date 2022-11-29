/**
 * Main file of webpack config for RTL.
 * Please do not modified unless you know what to do
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const del = require('del')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const RtlCssPlugin = require('rtlcss-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// global variables
const rootPath = path.resolve(__dirname)
const distPath = rootPath + '/src/theme/assets';
const distPathPublic = rootPath + '/public/assets';


const entries = {
  'css/style': './src/theme/assets/sass/style.scss',
}

// remove older folders and files
;(async () => {
  await del.sync(distPath + '/css', {force: true})
})()

function srcPath(subdir) {
  return path.join(__dirname, "src", subdir);
};

function mainConfig() {
  return {
    // enabled/disable optimizations
    mode: 'development',
    watch: true,
    // console logs output, https://webpack.js.org/configuration/stats/
    stats: 'errors-only',
    performance: {
      // disable warnings hint
      hints: false,
    },
    entry: entries,
    output: {
      // main output path in assets folder
      path: distPathPublic,
      // output path based on the entries' filename
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.scss', '.js', '.jsx', '.json', '.ts', '.tsx'],
      alias: {
        src: srcPath('src'),
      },
      plugins: [new TsconfigPathsPlugin({ baseUrl: path.join(__dirname, "src") })]
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new RtlCssPlugin({
        filename: '[name].rtl.css',
      }),
      {
        apply: (compiler) => {
          // hook name
          compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
            ;(async () => {
              await del.sync(distPath + '/css/*.js', {force: true})
            })()
          })
        },
      },
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
  }
}

module.exports = function () {
  return [mainConfig()]
}
