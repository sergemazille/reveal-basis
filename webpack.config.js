const path = require('path');
const outputDir = 'dist'; // generated files project folder
const outputScriptDir = 'script'; // generated scripts files folder name

module.exports = {
    entry: './src/script/main.js',
    output: {
        path: path.resolve(__dirname, `${outputDir}`),
        filename: `${outputScriptDir}/reveal-basis.min.js`,
        library: 'rb' // global scope variable (rb stands for 'reveal-basis')
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
