var path = require('path');
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.jsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath: "/",
    },
    
    mode: "development",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    devServer: {
        contentBase: "./dist/",
        port: 3000,
        index: "/dist/index.html",
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css"]
    },

    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: "http://localhost:3000/",
        },{
            reload: false
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
          }),
    ],

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // Handle jsx files
            { test: /\.(jsx)$/, exclude: /node_modules/, loader: "babel-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            // Import .css stylesheets in javascript
            { test:/\.css$/, use:['style-loader','css-loader'] },
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
