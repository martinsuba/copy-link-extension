const path = require('path');
const { argv } = require('yargs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const iframes = require('./config');

const babelLoader = {
  test: /\.js|\.ts|\.tsx$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-env',
        '@babel/typescript',
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          { corejs: 2 },
        ],
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
      ],
    },
  },
  include: [
    path.resolve(__dirname, '../source'),
  ],
  exclude: [
    path.resolve(__dirname, '../node_modules'),
  ],
};

const htmlLoader = {
  test: /\.(html)$/,
  use: {
    loader: 'html-loader',
  },
};

const sassLoader = {
  test: /\.scss$/,
  use:
    [
      { loader: MiniCssExtractPlugin.loader },
      { loader: 'css-loader' },
      { loader: 'resolve-url-loader' },
      { loader: 'sass-loader', options: { sourceMap: true } },
    ],
};

const urlLoader = {
  test: /\.(png|jpg|gif|otf|svg|eot|ttf|woff|woff2)$/,
  loader: 'url-loader',
  options: {
    limit: 1400,
    name: 'assets/[name].[ext]',
  },
};

const baseConfig = {
  mode: argv.mode || 'development',
  context: path.resolve(__dirname, '../source'),
  devtool: argv.mode === 'production' ? 'none' : 'inline-source-map',
  node: {
    fs: 'empty',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      babelLoader,
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './static',
        to: './',
        toType: 'dir',
      },
    ]),
  ],
  bail: true,
};

const contentScriptOverride = {
  entry: {
    'content-script': './content-script/index.ts',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      babelLoader,
    ],
  },
};

const backgroundOverride = {
  entry: {
    background: './background/index.ts',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
};

const iframesOverride = {
  entry: iframes.reduce((obj, iframe) => ({ ...obj, [`${iframe}/index`]: `./content-script/iframes/${iframe}/index.js` }), {}),
  output: {
    path: path.resolve(__dirname, '../dist/iframes/'),
  },
  plugins: [
    ...baseConfig.plugins,
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    ...iframes.map((iframe) => new HtmlWebpackPlugin({
      template: `content-script/iframes/${iframe}/index.html`,
      filename: `${iframe}/index.html`,
      inject: false,
    })),
  ],
  module: {
    rules: [
      htmlLoader,
      babelLoader,
      sassLoader,
      urlLoader,
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: { comments: false },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
};

const contentScriptConfig = {
  ...baseConfig,
  ...contentScriptOverride,
};

const backgroundConfig = {
  ...baseConfig,
  ...backgroundOverride,
};

const iframesConfig = {
  ...baseConfig,
  ...iframesOverride,
};

module.exports = [
  contentScriptConfig,
  backgroundConfig,
  iframesConfig,
];
