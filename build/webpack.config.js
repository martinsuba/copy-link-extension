/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { argv } = require('yargs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        '@babel/proposal-object-rest-spread',
        '@babel/plugin-proposal-optional-chaining',
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
    options: {
      minimize: true,
    },
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
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(argv.mode === 'production'),
    }),
  ],
  module: {
    rules: [
      babelLoader,
    ],
  },
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
  plugins: [
    ...baseConfig.plugins,
    new CopyWebpackPlugin([
      {
        from: './static',
        to: './',
        toType: 'dir',
      },
    ]),
  ],
};

const iframesOverride = {
  entry: iframes.reduce((obj, iframe) => ({ ...obj, [`${iframe}/index`]: `./content-script/iframes/${iframe}/index.ts` }), {}),
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
};

const uiOverride = {
  entry: {
    index: './ui/index.ts',
  },
  output: {
    path: path.resolve(__dirname, '../dist/ui/'),
  },
  plugins: [
    ...baseConfig.plugins,
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: 'ui/index.html',
      filename: 'index.html',
      inject: false,
    }),
  ],
  module: {
    rules: [
      htmlLoader,
      babelLoader,
      sassLoader,
      urlLoader,
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

const uiConfig = {
  ...baseConfig,
  ...uiOverride,
};

module.exports = [
  contentScriptConfig,
  backgroundConfig,
  iframesConfig,
  uiConfig,
];
