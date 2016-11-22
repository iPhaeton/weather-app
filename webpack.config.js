const path = require("path");

module.exports = {

    entry: {
        script: path.resolve(__dirname, "src", "app", "index.js")
    },

    output: {
        path: path.resolve(__dirname, "dist", "app"),
        filename: "bundle.js",
        pablicPath: "/app/"
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
                loader: "style-loader!css-loader"
            }
        ]
    },

    devtool: "source-map"

};