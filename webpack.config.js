const path = require('path');
const outputDir = 'dist';
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/script/main.js',
    output: {
        path: path.resolve(__dirname, `${outputDir}`),
        filename: 'reveal-basis.min.js',
        library: 'rb',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        },
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("reveal-basis.css"),
    ]
};
