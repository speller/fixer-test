const path = require('path')
const webpack = require('webpack')

const TerserPlugin = require('terser-webpack-plugin')
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')


module.exports = (env, argv) => {
  const webpackMode = argv.mode || 'development'
  const appTarget = env.APP_TARGET || 'dev'
  console.log(`Webpack mode: ${webpackMode}`)
  console.log(`Application target: ${appTarget}`)

  // Replace env-related modules depending on the APP_TARGET env variable.
  // Should be used only for conditional config files inclusion.
  const configReplacementPlugin = new webpack.NormalModuleReplacementPlugin(/(.*)-APP_TARGET(\.*)/, function(resource) {
    const r = resource.request.replace(/-APP_TARGET/, `-${appTarget}`)
    console.log(`Replace module '${resource.request}' with '${r}'`)
    resource.request = r
  })

  const entries = {
    'app': './js/entry.js',
  }

  // let cssBundlesCacheGroups = {}
  // for (const entryName in entries) {
  //   cssBundlesCacheGroups[`${entryName}-style`] = {
  //     name: `${entryName}-style`,
  //     test: /\.s?css$/,
  //     chunks: chunk => chunk.name.match(new RegExp(`(~|^)${entryName}(~|\\.|$)`)),
  //     minChunks: 1,
  //     reuseExistingChunk: true,
  //     enforce: true,
  //   }
  // }


  if (webpackMode === 'production') {
    // Add bundle analyzer in prod mode
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      })
    )
    // Add JS uglifier and CSS optimization in prod mode
    config.optimization.minimizer = [
      new TerserPlugin(),
      // new OptimizeCSSAssetsPlugin({}),
    ]
  }
  let config = {
    // Dev mode web server config
    devServer: {
      inline: true,
      port: 8082,
      host: '0.0.0.0',
      publicPath: '/wwwroot/build',
      historyApiFallback: true,
      contentBase: __dirname,
      watchContentBase: true,
      disableHostCheck: true,
    },
    entry: entries,
    module: {
      rules: [
        {
          test: /\.js$/,
          loaders: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            // 'style-loader', // Load styles from JS
            // MiniCssExtractPlugin.loader, // Extract CSS into external file
            'css-loader', // Ability to import CSS in JS module
            'postcss-loader', // Add CSS refixes
            'sass-loader?sourceMap', // Compile SCSS to CSS
          ],
        },
        {
          test: /\.css$/,
          use: [
            // 'style-loader',
            // MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'url-loader',
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
        },
      ],
    },
    optimization: {
      // Split bundles into chunks
      // splitChunks: {
      //   chunks: 'all',
      //   // Merge CSS for each entry point bundle into single file (we can't split css correctly without duplicates until https://github.com/NMFR/optimize-css-assets-webpack-plugin/issues/41)
      //   cacheGroups: cssBundlesCacheGroups,
      // },
    },
    // Where to put compiled JS
    output: {
      path: path.resolve(__dirname, 'wwwroot/build'),
      filename: '[name].js',
    },
    plugins: [
      configReplacementPlugin,
      // Configure CSS extraction
      // new MiniCssExtractPlugin({
      //   filename: '[name].css',
      // }),
      // Optimize CSS files removing duplicate styles
      // new OptimizeCssAssetsPlugin({
      //   assetNameRegExp: /.*\..css$/g,
      //   cssProcessor: require('cssnano'),
      //   cssProcessorPluginOptions: {
      //     preset: ['default', { discardComments: { removeAll: true } }],
      //   },
      //   canPrint: true,
      // }),
      // Create index.html files for each route
      // new HtmlWebpackPlugin({
      //   ...htmlPluginDefaultConfig,
      //   title: 'Authentication',
      //   filename: path.resolve(__dirname, 'signin.html'),
      //   chunks: ['auth', 'vendors~auth', 'vendors~auth~dashboard', 'auth~dashboard', 'auth-style'],
      // }),
      // new HtmlWebpackPlugin({
      //   ...htmlPluginDefaultConfig,
      //   title: 'Forgotten password',
      //   filename: path.resolve(__dirname, 'forgot.html'),
      //   chunks: ['auth', 'vendors~auth', 'vendors~auth~dashboard', 'auth~dashboard', 'auth-style'],
      // }),
      // new HtmlWebpackPlugin({
      //   ...htmlPluginDefaultConfig,
      //   filename: path.resolve(__dirname, 'index.html'),
      //   chunks: ['auth', 'vendors~auth', 'vendors~auth~dashboard', 'auth~dashboard', 'auth-style'],
      // }),
      // new HtmlWebpackPlugin({
      //   ...htmlPluginDefaultConfig,
      //   title: 'Dashboard',
      //   filename: path.resolve(__dirname, 'dashboard.html'),
      //   chunks: ['dashboard', 'vendors~dashboard', 'vendors~auth~dashboard', 'auth~dashboard', 'dashboard-style'],
      // }),
      // new HtmlWebpackHarddiskPlugin(),
    ],
  }
  return config
}
