const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const generateHtmlPlugin = (title) => {
    return new HtmlWebpackPlugin({
        template: `./${title.toLowerCase()}/index.html`,
        title,
        chunks: [title.toLowerCase()],
        filename: `${title.toLowerCase()}/index.html`,
    })
}

const generateWasmPackPlugin = (title) => {
    return new WasmPackPlugin({
        crateDirectory: path.resolve(__dirname, `.${title.toLowerCase()}`)
    });
}

const populatePlugins = (pagesArray) => {
  res = [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Advent of Code Visualizations',
            chunks: [],
            filename: 'index.html',
        }),
    ];
  pagesArray.forEach(page => {
    res.push(generateHtmlPlugin(page));
    res.push(generateWasmPackPlugin(page));
  })
  return res;
}


const populateEntrypoints = (pagesArray) => {
    entry = {};
    pagesArray.forEach(page => {
        entry[page.toLowerCase()] = `./${page.toLowerCase()}/index.js`;
    })
    return entry;
}

const pagesArray = ['day15', 'day16'];

const pages = populatePlugins(pagesArray);
const entries = populateEntrypoints(pagesArray);;

module.exports = {
    entry: {
        day15: './day15/index.js',
        day16: './day16/index.js',
        maze_gen: './maze-gen/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Advent of Code Visualizations',
            chunks: [],
            filename: 'index.html',
        }),
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, "./day15")
        }),
        new HtmlWebpackPlugin({
            template: './day15/index.html',
            title: 'Day15',
            chunks: ['day15'],
            filename: 'day15/index.html',
        }),
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, "./day16")
        }),
        new HtmlWebpackPlugin({
            template: './day16/index.html',
            title: 'Day16',
            chunks: ['day16'],
            filename: 'day16/index.html',
        }),
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, "./maze-gen")
        }),
        new HtmlWebpackPlugin({
            template: './maze-gen/index.html',
            title: 'Maze Gen',
            chunks: ['maze_gen'],
            filename: 'maze-gen/index.html',
        }),
    ],
    mode: 'development',
    experiments: {
        asyncWebAssembly: true
   }
};

