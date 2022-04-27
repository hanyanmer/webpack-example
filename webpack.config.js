const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    entry: path.resolve(__dirname, './src/main.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][chunkhash].js',
        publicPath: '/',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    // 代码分块，开箱即用，默认情况下影响按需加载的chunks
    optimization: {
        splitChunks: {
        }
    }
}