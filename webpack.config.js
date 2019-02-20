const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
    const environment = dotenv.config().parsed;

    console.log(environment);

    return {
        mode: (environment.PRODUCTION === 'true') ? "production" : "development",
        entry: "./src/index.tsx",
        devtool: (environment.PRODUCTION === 'true') ? "source-map" : "inline-source-map",
        output: {
            filename: 'bundle.[hash].js',
            path: __dirname + '/dist',
            publicPath: '/'
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".styles"]
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)?$/,
                    enforce: 'pre',
                    use: [
                        {
                            loader: 'tslint-loader',
                            options: {
                                configFile: __dirname + '/tslint.json',
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
                        configFile: 'tsconfig.json'
                    }
                },
                {
                    test: /\.(svg|woff|woff2|ttf)$/,
                    loader: 'url-loader'
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        {loader: "style-loader"},
                        {loader: "css-loader"},
                        {loader: "sass-loader"}
                    ]
                }
            ]
        },
        devServer: {
            historyApiFallback: true,
            contentBase: [
                __dirname + '/dist/'
            ],
            compress: true,
            host: 'localhost',
            port: 3032,
            open: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: __dirname + '/src/index.html',
                title: environment.title
            }),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(environment)
            })
        ]
    };
};
