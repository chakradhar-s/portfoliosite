const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackRxjsExternals = require('webpack-rxjs-externals');

const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack/hot/only-dev-server',
        './client/index.js',
        'tether'
    ],
    output: {
        libraryTarget: 'umd',
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
        publicPath: 'build/',
    },
    externals: [
        webpackRxjsExternals()
    ],
    devServer: {
        contentBase: 'client/', // Relative directory for base of server
        publicPath: '/', // Live-reload
        inline: true,
        port: process.env.PORT || 3000, // Port Number
        host: 'localhost', // Change to '0.0.0.0' for external facing server
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [
        new CleanWebpackPlugin(['build/*.js', 'build/*.css'], {
            verbose: true,
            dry: false
        }),
        new ExtractTextPlugin('../client/main.css'),
        new TransferWebpackPlugin([
            { from: 'client' },
        ]),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            tether: 'tether',
            Tether: 'tether',
            'window.Tether': 'tether',
            Popper: ['popper.js', 'default'],
            'window.Tether': 'tether',
            Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
            Button: 'exports-loader?Button!bootstrap/js/dist/button',
            Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
            Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
            Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
            Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
            Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
            Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
            Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: 'exports-loader?Util!bootstrap/js/dist/util'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                },
            },
            {
                test: /\.(scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader', // translates CSS into CommonJS modules
                        }, {
                            loader: 'postcss-loader', // Run post css actions
                            options: {
                                plugins() {
                                    // post css plugins, can be exported to postcss.config.js
                                    return [
                                        precss,
                                        autoprefixer
                                    ];
                                }
                            }
                        }, {
                            loader: 'sass-loader' // compiles SASS to CSS
                        }
                    ]
                })
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?name=images/[name].[ext]',
                    'image-webpack-loader?bypassOnDebug'
                ]
            },
            // bootstrap-4
            {
                test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery'
            }
        ]
    }
};