var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HandlebarsPlugin = require("handlebars-webpack-plugin");

module.exports = {
    entry: ['./src/components/MASTER/main.bundle.js', './src/components/MASTER/style.bundle.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/main.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ],
        rules: [{ // sass / scss loader for webpack
            test: /\.(sass|scss)$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
        }]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin({ // define where to save the file
            filename: './css/[name].css',
            allChunks: true,
        }),
        new HandlebarsPlugin({
            // path to hbs entry file(s)
            entry: path.join(process.cwd(), "src", "pages", "*.hbs"),
            // output path and filename(s)
            // if ommited, the input filepath stripped of its extension will be used
            output: path.join(process.cwd(), "dist", "[name].html"),

            partials: [
                path.join(process.cwd(), "src", "components", "*", "*.hbs")
            ],

            // hooks
            onBeforeSetup: function (Handlebars) { },
            onBeforeAddPartials: function (Handlebars, partialsMap) { },
            onBeforeCompile: function (Handlebars, templateContent) { },
            onBeforeRender: function (Handlebars, data) { },
            onBeforeSave: function (Handlebars, resultHtml, filename) { },
            onDone: function (Handlebars, filename) { }
        })
    ],
};