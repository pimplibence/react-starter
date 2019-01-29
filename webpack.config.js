const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => ({
    mode: "development",
    entry: "./src/index.tsx",
    devtool: "inline-source-map",
    output: {
        filename: 'bundle.[hash].js',
        path: __dirname + '/dist',
        publicPath: '/'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".scss"]
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                loader: "ts-loader",
                options: {
                    configFile: 'tsconfig.json'
                }
            },
            {
                test: /\.(svg|png|eot|woff2|woff|ttf)$/,
                loader: 'url-loader'
            },
            {
                test: /\.scss$/,
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
            template: __dirname + '/src/index.html'
        })
    ]
});
