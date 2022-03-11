const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

//和common配置文件合并
module.exports = merge(common, {
    devtool: 'inline-source-map',
    mode: 'none',

    //调试用http服务器配置
    devServer: {
        //调试时候源代码的位置
        static: './dist',

        //服务器端口
        port: 8080,

        //服务器地址，注意这里如果配置为`127.0.0.1`的话局域网内其他机器无法访问此服务器。
        host: '0.0.0.0',

        //监听本地js文件，有修改的话自动重新刷新页面。
        hot: true
    }
})
