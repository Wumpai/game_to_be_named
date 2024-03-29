/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
var WebpackObfuscator = require("webpack-obfuscator");

const { merge } = require("webpack-merge");

// plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
    const developmentMode = env.mode === "development";

    /** @type {import('webpack').Configuration} */
    const config = {
        entry: "./src/index.ts",

        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
        },

        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader",
                    options: {
                        emitError: true,
                        emitWarning: true,
                        fix: developmentMode,
                        failOnError: !developmentMode,
                        failOnWarning: !developmentMode,
                    },
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: developmentMode,
                            },
                        },
                        "css-loader",
                    ],
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },

        plugins: [
            new HtmlWebpackPlugin(),
            new WebpackObfuscator(
                {
                    

                    compact: true,
                    disableConsoleOutput: true,
                    numbersToExpressions: true,

                    rotateStringArray: true,
                    shuffleStringArray: true,
                    splitStrings: true,
                    splitStringsChunkLength: 10,
                    stringArray: true,
                    stringArrayEncoding: true,
                    stringArrayThreshold: 0.75,

                    identifiersPrefix: "devTest",
                    numbersToExpressions: true,
                    identifierNamesGenerator: "hexadecimal",
                    identifiersDictionary: ["IlllIlIl", "IllIlIIl", "IllI", "lll", "IlllIl"],
                },
                ["excluded_bundle_name.js"]
            ),
            new CopyPlugin({
                patterns: [
                    {
                        from: "assets/**",

                        // if there are nested subdirectories , keep the hierarchy
                        transformPath(targetPath, absolutePath) {
                            const assetsPath = path.resolve(__dirname, "assets");
                            let endpPath = absolutePath.slice(assetsPath.length);

                            return Promise.resolve(`assets/${endpPath}`);
                        },
                    },
                ],
            }),
        ],
    };
    const envConfig = require(path.resolve(__dirname, `./webpack.${env.mode}.js`))(env);

    const mergedConfig = merge(config, envConfig);

    return mergedConfig;
};
