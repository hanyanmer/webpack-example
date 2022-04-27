const path = require("path")
const express = require("express")
const webpack = require("webpack")


const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-Hot-middleware")
const webpackConfig = require('../webpack.config.js')

const app = express()

const DIST_DIR = path.join(__dirname, "../dist")// 设置静态访问文件路径

const PORT = 9090 // 设置启动端口

// 跨域
// app.use('*', (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Credentials', 'true')
//     res.setHeader('Access-Control-Allow-Headers', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST,OPTIONS,PUT,DELETE')
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     next()
// })
const complier = webpack(webpackConfig)
let devMiddleware = webpackDevMiddleware(complier, {
    // webpack-dev-server的静态资源服务路径
    publicPath: webpackConfig.output.publicPath,
})
// const fsMemory = devMiddleware.context.outputFileSystem

let hotMiddleware = webpackHotMiddleware(complier)
app.use(devMiddleware)


app.use(hotMiddleware);
// app.get('*', (req, res) => {
//     fsMemory.readFile(
//         // 如果是dev环境，不是通过静态资源拿的文件
//         // 所有的请求，首先拿的都是index.html入口文件
//         path.join(compiler.outputPath, 'index.html'),
//         (err, file) => {
//             if (err) {
//                 console.warn(err)
//                 res.send(err)
//             } else {
//                 res.send(file.toString())
//             }
//         },
//     )
// })

// 设置访问静态文件的路径
// 生产环境下使用
app.use(express.static(DIST_DIR))



app.listen(PORT, function () {
    console.log("成功启动：localhost:" + PORT)
})