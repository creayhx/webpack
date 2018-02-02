const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin'); //webpack 带的js压缩
const htmlPlugin = require('html-webpack-plugin'); // 需要安装 html的压缩
const extractTextPlugin = require('extract-text-webpack-plugin'); // 需要安装 用于css分离
const purifyCssPlugin = require('purifycss-webpack'); // 删除没有使用的css
const copyWebpackPlugin = require('copy-webpack-plugin');//复制静态文件 不参与实际开发的相关文件

const entry = require('./webpack_config/entry_webpack.js'); // 入口配置文件

if(process.env.type == 'build'){
    var publicPath = 'http://120.55.59.191:8080';
}else{
    var publicPath = 'http://127.0.0.1:8080/'
};

module.exports = {
    // source-map  独立map 包括 行和错误字符位置
    // cheap-module-source-map   不包错误字符位置
    //eval-source-map 不生成独立的文件 包括行和错误字符位置 直接在js文件中生成map   一定要开发阶段
    //cheap-eval-source-map 不生成独立的文件 不包含错误字符位置 直接在js文件中生成map   一定要开发阶段
    // devtool: 'eval-source-map',
    entry:{
        entry : './src/entry.js',
        jquery : 'jquery'
    },
    output:{ //出口
        path : path.resolve(__dirname, 'dist'),//路径
        filename : 'js/[name].js', //文件名称
        publicPath : publicPath
    },
    module : { //模块
        rules:[
            {
                test : /\.css$/,
                use : extractTextPlugin.extract({
                    fallback:'style-loader',
                    use : [
                        {
                            loader : 'css-loader'
                        },
                        'postcss-loader'
                    ]
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
            },
            {
                test : /\.less$/,
                use : extractTextPlugin.extract({
                    use : [{
                        loader:'css-loader'
                    },{
                        loader : 'less-loader'
                    }],
                    fallback : 'style-loader'
                })
            },
            {
                test : /\.sass$/,
                use : extractTextPlugin.extract({
                    use : [{
                        loader:'css-loader'
                    },{
                        loader : 'sass-loader'
                    }],
                    fallback : 'style-loader'
                })
            },
            {
                test : /\.(js|jsx)$/, //es6 jsx 转成 es5的版本
                use: [{
                    loader : 'babel-loader'
                }],
                exclude : /node_modules/
            }
        ]  
    },
    plugins : [ // 插件
        // new uglifyJsPlugin() //代码 压缩
        new webpack.optimize.CommonsChunkPlugin({ // 公用的插件
            name : ['jquery'],
            filename : 'js/[name].min.js',
            minChunks : 2
        }),
        new webpack.ProvidePlugin({ // 使用指定的框架
            $ : 'jquery'
        }),
        new htmlPlugin({// html压缩选项
            minify : { 
                removeAttributeQuotes : true, //去除属性的引号
            },
            hash : true, //给引入文件一个hash,
            template : './src/index.html' // 需要进行压缩的模板
        }),
        new extractTextPlugin("css/index.css"),
        new purifyCssPlugin({ //删除没有使用过的css
            paths : glob.sync(path.join(__dirname, 'src/*.html')),
        }),
        new webpack.BannerPlugin('版权所有'), // js上面的 版权信息
        new copyWebpackPlugin([{
            from : __dirname + '/src/public' , //要打包的静态资源文件路径
            to : './public' // 由于已经制定了出口地址  所以只需要出口地址后面的目录
        }])
    ], 
    devServer :{// webpack 开发服务
        contentBase : path.resolve(__dirname, 'dist'),// 监听的目录结构
        host:'127.0.0.1',
        port: 8080,
        compress: false, // 压缩webpack
    },
    watchOptions:{  //  webpack --watch 使用
        poll : 1000, //检测修改的时间
        aggregateTimeout : 500, // 保存间隔 小于这个时间只打包一次
        ignored : /node_module/
    }
};