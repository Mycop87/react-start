let path = require('path');

module.exports = {
    devtool: "source-map",

    entry: [
        './src/index.tsx'
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath:'/static/'
    },
    module: {
        rules:[
            {
                test: /\.js/,
                loaders:[ 'babel-loader', ],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.scss/,
                loaders:['style-loader','sass-loader']
            },
            {
                test: /\.css/,
                loaders:['style-loader','css-loader']
            }
        ]
    }
}
