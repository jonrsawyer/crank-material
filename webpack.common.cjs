const autoprefixer = require('autoprefixer');

module.exports = {

    output: {
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].bundle.css',
                        },
                    },
                    { loader: 'extract-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['./node_modules']
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        // TODO This needs to changed to something reasonable. What does Crank.js support?
                                        targets: {
                                            chrome: "80"
                                        }
                                    }
                                ],
                                "crank"
                            ]
                        }
                    }
                ]
            }
        ]
    },
};
