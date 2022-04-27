# webpack使用

## 1 启动webpack

启动webpack可以通过两种方式：使用命令行和调用webpack暴露出来的API

### 1.1使用命令行 

```
webpack --config 配置文件 
```

默认情况下，读取的是当前文件下的webpack.config.js文件，可以通过--config修改默认配置文件的名称

webpack其实是一个nodejs应用程序，全部由JavaScript开发完成。在命令行中执行webpack命令等价于执行node ./node_modules/webpack/bin/webpack.js

### 1.2使用node调用webpack的API

webpack其实是一个函数，使用方法如下

```
webpack({
    //webpack配置，和webpack.config.js文件中配置一致
},(err,stats)=>{
    if(err||stats.hasErrors()){
        //构建过程出错
    }
    //成功执行完构建
})
```

```
//如果有自己的配置文件，可以直接这样写
const config = require('./webpack.config.js')
webpack(config,callback)
```

```
//如果不给webpack传入可执行的回调函数的话，它会返回一个compiler实例。可以手动执行它。
const compiler = webpack(config)
compiler.run((err,stats)=>{
    if(err) //构建失败
    //否则构建成功
})
```

```
如果不给webpack传入可执行的回调函数的话，它会返回一个compiler实例。可以手动执行它，或者为他的构建时添加一个监听器
compiler实例提供的两个方法： 
.run(callback)
.watch(watchOptions,handler)
使用run方法启动所有的编译工作，完成之后执行传入的callback函数
```

## 2 webpack结合服务器使用

本地开发进行调试如果不引入webpack-dev-server每次都需要执行命令重新编译出新的包，然后刷新浏览器。而webpack-dev-server相当于服务器，当服务启动时，会让webpack进行模块打包并将资源准备好（会将打包的结果放在内存中，实际上并不会输出到dist下的bundle.js），每次请求时，它首先会进行url地址校验，如果该地址是资源服务地址（配置的publicPath），就会从webpack的打包结果中寻找该资源并返回给浏览器。

webpack-dev-server安装完成就可以使用了，相当于自动使用--watch，所以不需要重新构建，打包的内容就更新了

npm run serve 执行这个就会自动使用安装的webpack-dev-server启动一个服务然后执行打包。

对应的配置

```
devServer:{
	static:'/dist',
	open:true,(自动打开浏览器)
	host:'local ip',（ip）
	port:,（端口）
	hot:true,(模块热替换)
}
```

devServer是一个方便的小型http服务，是基于webpack-dev-middleware和express实现的。而webpack-dev-middleware是express的中间件。

webpack-dev-middleware本身没有模块热替换，devServe有是因为它自身实现了这个功能，为了让webpack-dev-middleware也有这个功能，需要引入webpack-hot-middleware。

## 3 运行

```
npm run build //打包文件
npm run dev //通过node方式启动webpack打包，不会输出dist文件，会在内存中
npm run dev1 //通过webpackserver启动一个服务运行
```

