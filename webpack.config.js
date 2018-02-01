const path = require('path');
const webpack = require('webpack');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin'); //webpack 带的js压缩
const htmlPlugin = require('html-webpack-plugin'); // 需要安装 html的压缩
const extractTextPlugin = require('extract-text-webpack-plugin'); // 需要安装 用于css分离

module.exports = {
    entry:{ //入口
        entry : './src/entry.js'
    }, 
    output:{ //出口
        path : path.resolve(__dirname, 'dist'),//路径
        filename : 'js/[name].js', //文件名称
        publicPath : './'
    },
    module : { //模块
        rules:[
            {
                test : /\.css$/,
                use : extractTextPlugin.extract({
                    fallback:'style-loader',
                    use : 'css-loader',
                    publicPath:'../'
                })
            },
            {
                test: /\.(png|jpg|gif)/,
                use : [{
                    loader : 'url-loader', // 其中已经包含了 file-loader模块了
                    options : {
                        limit : 5000 , //图片字节 大于5000就拷贝路径  小于5000 就用 base64
                        outputPath: 'images/'
                    }
                }]
            },{
                test : /\.(html|htm)$/,
                use : [
                    {
                        loader : 'html-withimg-loader'
                    }
                ]
            }
        ]  
    },
    plugins : [ // 插件
        // new uglifyJsPlugin() //代码 压缩 
        new htmlPlugin({
            minify : { // html压缩选项
                removeAttributeQuotes : true, //去除属性的引号
            },
            hash : true, //给引入文件一个hash,
            template : './src/index.html' // 需要进行压缩的模板
        }),
        new extractTextPlugin("css/index.css")
    ], 
    devServer :{ // webpack 开发服务
        contentBase : path.resolve(__dirname, 'dist'),// 监听的目录结构
        host:'127.0.0.1',
        port: 8080,
        compress: false, // 压缩webpack
    } 
};