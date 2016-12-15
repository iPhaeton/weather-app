const path = require("path");

module.exports = {

    entry: {
        script: path.resolve(__dirname, "src", "app", "index.js")
    },

    output: {
        path: path.resolve(__dirname, "dist", "app"),
        filename: "bundle.js",
        publicPath: "/dist/app"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                query: {
                    presets: ["es2015", "react"]
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?module"
            },
            {
                test: /\.html$/,
                loader: "html"
            },
            //for bootstrap
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?name=limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    },

    devtool: "source-map"

};