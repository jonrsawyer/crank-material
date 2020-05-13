const merge = require('webpack-merge');
const common = require('./webpack.common.cjs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    entry: [
        // Include the SwAK app only in testing
        './app.scss',
        './app.js'
    ],
    plugins: [
        // Changing the template recompiles but does not trigger reload. Reload the browser manually.
        // Known issue: https://github.com/jantimon/html-webpack-plugin/issues/100
        new HtmlWebpackPlugin({
            template: 'index.html',
            scriptLoading: 'defer',
            inject: 'body'
        }),
    ]

});
