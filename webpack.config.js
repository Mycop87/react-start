let path = require('path');

module.exports = {
    devtool: "source-map",

    entry: [
        './src/index.tsx'
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src/')
        }
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath:'/static/'
    },
    optimization: {
        minimize: false
    },
    devServer: {
        historyApiFallback:true,
    },
    module: {
        rules:[
            {
                test: /\.js/,
                loaders:[ 'babel-loader','react-hot' ],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'

            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',

                    },
                ],
            },
            {
                test: /\.css/,
                loaders:['style-loader','css-loader']

            }
        ]
    }
}
