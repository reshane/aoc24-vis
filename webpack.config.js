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
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: pages,
    mode: 'development',
    experiments: {
        asyncWebAssembly: true
   }
};

