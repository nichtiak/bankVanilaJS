const path  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {DefinePlugin, OptimizationStages} = require('webpack');

require('dotenv').config();

const mode = process.env.NODE_ENV
const isDev = mode === 'development'

const plugins = [
    new DefinePlugin({
        'process.env': JSON.stringify(process.env)
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: 'index.html',
        minify: {
            collapseWhitespace: !isDev,
            removeComments: !isDev,
        }                  
    }),
    new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css'
    })
]

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode,
    entry: './index.js',
    output: {
        filename: isDev ? '[name].js' : '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'public/[name].[contenthash][ext][query]'
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 7777,
        hot: true,
        static: {
            directory: path.join(__dirname, 'public')
        },
        historyApiFallback: true // переход по страницам по стрелкам вперёд назад в браузере
    },
    optimization: {
        minimize: !isDev,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    format: {
                        comments: false
                    }
                }
            })
        ]
    },
    plugins,
    module: {
        rules: [ // какие файлы будут обрабатываться
            {
                test: /\.html$/i,
                loader: 'html-loader' // какой плагин будет делать операцию
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // какие файлы исключить из обработки
                use: {
                    loader: 'babel-loader', // какой плагин будет делать операцию
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
                    
            },
            {
                test: /\.module\.s[ac]ss$/i, // проверить все файлы с расширением .module.scss и .module.sass
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]_[hash:base64:7]', // [local] - генерируемое имя класса, [hash:base64:7] - хеш
                                namedExport: false, // важно — отключить именованный экспорт
                                exportLocalsConvention: 'camelCase' // опционально
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /^((?!\.module).)*s[ac]ss$/i,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}