import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    entry: {
        vendor: path.resolve(__dirname, 'src/vendor'),
        main: path.resolve(__dirname, 'src/index')
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        //Use CommonsChunkPlugin to create a sepae bundle
        //of vendor libraries so that they're cached separately.
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        //Create html file that includes reference to budled js
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                MinifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            trackJSToken: '843d7611b24a4e17ab570f90b1822b8f'
        }),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new WebpackMd5Hash(),
        //Eliminate duplicate packages when generating bundle
        new webpack.optimize.DedupePlugin(),
        //Minify
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel']
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css?sourceMap')
            }
        ]
    }
}
