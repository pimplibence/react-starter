const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const env = require('./env');

module.exports = {
    mode: env.production ? "production" : "development",
    entry: "./src/index.tsx",
    devtool: env.production ? "source-map" : "inline-source-map",
    output: {
        filename: "bundle.[hash].js",
        chunkFilename: "[id].chunk.js",
        path: __dirname + "/dist",
        publicPath: "/",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".scss", ".css"]
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                enforce: "pre",
                use: [
                    {
                        loader: "tslint-loader",
                        options: {
                            configFile: __dirname + "/tslint.json",
                            emitErrors: true,
                            failOnHint: true
                        }
                    }
                ]
            },
            {
                test: /\.(ts|tsx)?$/,
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig.json"
                }
            },
            {
                test: /\.(svg|woff|woff2|ttf)$/,
                loader: "url-loader"
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"},
                    {loader: "postcss-loader"},
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: [
            __dirname + "/dist/"
        ],
        compress: true,
        host: "localhost",
        port: 3032,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: __dirname + "/src/index.html",
            title: env.title
        }),
        new BundleAnalyzerPlugin()
    ]
};
