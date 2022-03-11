const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    //游戏入口文件
    context: path.resolve(__dirname, 'src'),
    entry: ['./scripts/main.ts'],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        //js文件最终发布到哪个路径
        path: path.resolve(__dirname, 'dist'),

        //开发调试阶段webpack会自动处理这个文件让html引用到，虽然磁盘上不会有这个文件。
        //但是最终发布项目的时候会生成这个文件，并会插入到index.html中。
        //[hash:8]的意思是生成随机的八位hash值，为了缓存更新问题。
        filename: 'game.min.[hash:8].js',
    },
    target: 'web',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.join(__dirname, 'assets'), to: path.join(__dirname, 'dist/assets') },
            ],
        }),

        //拷贝html，插入js。
        new HtmlPlugin({
            file: path.join(__dirname, 'dist', 'index.html'),
            template: './index.html'
        })
    ]
} 
