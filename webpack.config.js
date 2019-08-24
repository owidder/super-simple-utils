const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const {foldersToBuild} = require("./scripts/searchFolders");

const PUBLIC_PATH = "public";
const TEMPLATES_PATH = "templates";
const SRC_PATH = "src";

const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const absPath = relPath => path.resolve(appDirectory, relPath);

const VERSION = require("./package.json").version;

const folderNamesAndFiles = foldersToBuild(SRC_PATH);

console.log(`version = ${VERSION}`);
console.log(`mode = ${process.env.NODE_ENV}`);
console.log(folderNamesAndFiles);

const config = {
    mode: process.env.NODE_ENV,
    entry: {
        superSimpleUtils: "./src/index.ts",
        ...folderNamesAndFiles.reduce((_entry, folderNameAndFile) => {
            return {..._entry, [folderNameAndFile.folderName]: `./src/${folderNameAndFile.folderName}/${folderNameAndFile.fileName}`}
        }, {})
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: `static/js/[name].${VERSION}.js`,
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 9000
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                loader: require.resolve('source-map-loader'),
                enforce: 'pre',
                include: absPath("src"),
            },
            {
                oneOf: [
                    {
                        test: /\.(ts|tsx)$/,
                        include: absPath("src"),
                        use: [
                            {
                                loader: require.resolve('ts-loader'),
                                options: {
                                    // see: https://github.com/TypeStrong/ts-loader#faster-builds
                                    transpileOnly: true,
                                },
                            },
                        ],
                    },
                    {
                        test: /\.less$/,
                        use: ["style-loader", "css-loader", "less-loader"]
                    },
                    {
                        test: /\.css$/,
                        use: [{loader: MiniCssExtractPlugin.loader}, "css-loader"]
                    },
                ],
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([PUBLIC_PATH]),
        new MiniCssExtractPlugin({
            filename:  `static/css/[name].${VERSION}.css`,}),
        new HtmlWebpackPlugin({
            filename: "superSimpleUtils.html",
            inject: true,
            chunks: ["superSimpleUtils"],
            template: `${PUBLIC_PATH}/index.html`,
        })
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
}

module.exports = config
