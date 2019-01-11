/**
 * Created by Talel on 2018-10-24.
 */
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');

let pathsToClean = [
    'dist',
]

// the clean options to use
let cleanOptions = {
    root:     path.resolve('./'),
    verbose:  true,
    dry:      false
}


let config = {

    mode:'development',
    entry: {
        app:["./assets/css/app.scss", "./assets/js/app.js"],
    },
    watch: false,
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        publicPath:'/dist/'
    },
    devServer:{
      overlay:true
    },
    module: {
        // configuration regarding modules
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [ 'babel-loader'],
            },
            {
                test:/\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use:[
                        'css-loader'
                    ]
                })
            },
            {
                test:/\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use:[
                        'css-loader',
                        'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name:"[hash].[ext]"
                        }
                    }
                ]
            }

        ]

    },
    plugins:[]

}

module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.watch = true;
        config.plugins.push(new ExtractTextPlugin("[name].css"))
        config.plugins.push(new ManifestPlugin())
        config.plugins.push(new CleanWebpackPlugin(pathsToClean,cleanOptions))
    }

    if (argv.mode === 'production') {
        config.plugins.push(new UglifyJsPlugin())
    }

    return config;
};