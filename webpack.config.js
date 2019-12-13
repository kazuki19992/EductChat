module.exports = {
    target: "electron",
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    entry: {
        "main/index": "./src/main/index.js",
        "renderer/app": "./src/renderer/app.jsx"
    },
    output: {
        filename: "dist/js/[name].js"
    }
};
