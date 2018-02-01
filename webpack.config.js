const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
module.exports = {
    entry:{ //入口
        entry1 : './src/entry.js'
    }, 
    output:{ //出口
        path : path.resolve(__dirname, 'dist'),//路径
        filename : '[name].js',//文件名称
    },
    module : { //模块
        rules:[
            {
                test : /\.css$/,
                use : ['style-loader','css-loader']
                // use : [{
                //     loader : 'style-loader'
                // },
                // {
                //     loader : 'css-loader'
                // }]
                // loader : ['style-loader','css-loader']
                // include
                // exinclude
                // query
            }
        ]  
    },
    plugins : [ // 插件
        new uglify()
    ],
    devServer :{ // webpack 开发服务
        contentBase : path.resolve(__dirname, 'dist'),// 监听的目录结构
        host:'127.0.0.1',
        port: 8080,
        compress: true, // 压缩webpack
    } 
};