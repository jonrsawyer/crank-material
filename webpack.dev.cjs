const merge = require('webpack-merge');
const common = require('./webpack.common.cjs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // Use empty serve directory, not dist, else will attempt to serve all separate production
        // JS files and fail (WebSocket connection issues)
        contentBase: './serve',
        hot: true
    },
    entry: {
        // Include the SwAK app only in testing
        appcss: './app.scss',
        app: './app.js'
    },
    plugins: [
        // Changing the template recompiles but does not trigger reload. Reload the browser manually.
        // Known issue: https://github.com/jantimon/html-webpack-plugin/issues/100
        new HtmlWebpackPlugin({
            template: 'index.html',
            scriptLoading: 'defer',
            inject: 'body'
        })
    ]
});
