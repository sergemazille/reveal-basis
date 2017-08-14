const path = require('path');
const outputDir = 'dist';

module.exports = {
    entry: './src/script/main.js',
    output: {
        path: path.resolve(__dirname, `${outputDir}`),
        filename: 'reveal-basis.min.js',
        library: 'rb',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
                ]
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
    }
};
