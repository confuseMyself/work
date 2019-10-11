# webpack 基础知识

![CDD917EF-D24E-4b0a-AC4E-CDB60FB291D2](C:\Users\37364\Desktop\CDD917EF-D24E-4b0a-AC4E-CDB60FB291D2.png)



# 1、前端工程化
## 什么是前端工程化
- 工程化是系统化、模块化、规范化的过程；
- 工程化主要解决“如何提高整个系统生产效率”的问题
## 前端工程化的主要改变在哪些方面
- 工具：需要用到更多的自动化机械，更多的脚手架
- 人员：协作的人开始变得更多，需要有一定的机制保障合作的顺畅
- 编写代码方式：大量的用到预制模版，用组件化的方式写项目
# 2、webpack主要功能
- 编译：JavaScript，css编译
- 文件的压缩，打包，合并，公共模块提取等
- 图片等资源的处理如压缩图片、合并雪碧图
- Tree-shaking等优化JavaScript工具
- webpack-dev-server，eslint，热更新等帮助开发的工具
# 3、webpack 安装
- 安装node
- 全局安装 npm install webpack -g;(webpack4.0还需要全局安装webpack-cli)
# 4、webpack 核心概念和基础使用
1. webpack配置文件 webpack.config.js 的重要性
- 配置文件是webpack打包的依据，webpack如何打包，打包成什么样，全都由配置文件来指定
- 对于webpack，我们的主要工作也是编写、修改webpack的配置文件
- webcpack配置文件的核心概念：Entry和Output，loader，plugin
2. webcpack配置文件的核心概念：Entry和Output，loader，plugin的理解
- Entry：Entry是webpack的打包入口：代码从这里开始编译，程序开始的起点
- Output: Output是webpack打包的出口：最终的打包结果会根据output的定义输出，会影响到资源的路径
```
module.exports = {
   //entry:'./app.js',
   //entry:['./app.js','./app2.js'], // 将两个入口文件打包成一个入口文件

   // 将入口文件打包成多个入口文件
   entry: {
      app111: './app.js',
      app222: "./app2.js",
   },
   output: {
      path: __dirname + '/src/mybundle', // 指定打包的文件夹
      filename: './js/[name].[hash:6].js'  // 指定打包后文件存放的文件夹和打包后问价的名字
   },
   // 打包规则，编译规则
   module: {
      // 打包规则，编译规则
      rules: [
         {
            test: /\.js$/, // 匹配js的文件
            use: [
               {
                  loader: 'babel-loader', // 编译es6
                  option: {}, // loader的配置项
               }
            ]
         }
      ]
   }
}
```
- plugin：webpack插件plugin是webpack的额外扩展：一些插件式的额外功能由plugin定义，帮助webpack优化代码，提供功能；plugin有的是webpack自带的，有的需要额外安装

```

```

3.常用的loader列举
- css：css-loader,style-loader 等css处理loader
- url-loader,image-loader 等图片字体文件等资源的处理loader
- less-loader,sass-loader,babel-loader 等编译的loader
- 语法糖的loader，比如vue-loader

4.常用的plugin列举
- commonsChunkPlugin:提取公共模块，uglifyjsWebpackPlugin:减少js体积，PurifyCSS:优化css体积；
- HtmlWepackPlugin:把打包结果再打包一个html，把打包结果自动的引入该html中;HotModuleReplagementPlugin：热更新插件
# 5、用webpack开始一次打包
## 1、直接指定出口与入口
webpack-cli --entry <entry> --output <output>
## 2、通过配置文件打包
1.不指定配置文件名打包：直接在命令行输入webpack
2.指定配置文件名打包： webapck --config <configfile>
## 3、全局webpack和局部webpack
- 全局webpack：通过-g安装的webpack为全局webpack，可以在命令行里直接输入webpack命令的为全局webpack
- 局部webpack：在项目文件夹下安装的webpack，即安装在项目文件夹里的node_modules里；局部webpack的作用：当我们的项目需求的webpack版本和我们全局的webpack版本不一致时，就需要安装局部的webpack
- 安装局部webpack：npm installwebpack --save-dev
- 使用局部webpack打包：通过在package.json script 增加一个命令，build：webpack ，在命令行里通过 使用 npm run build ，可以优先使用局部webpack打包
# 6、JavaScript的编译
## 1、编译需要安装的loader
- 编译es6语法： babel-loader, @babel/core （babel-loader是编译es6、es7的语法的） ，babel-preset:储存JavaScript不同标准的插件，通过使用正确的presets，告诉babel按照哪个规则编译；

```
module.exports = {
    entry: {
        app: './app.js'
    },

    output: {
        filename: '[name].[hash:8].js'
    },
    module:{
    	rules:[
    	 {
            /**
             * 编译js，主要是将es6，es7的语法编译成浏览器支持的es5，
             * 所需要的loader：babel-loader，@babel/core（用来解析babel-loader的）；
             * 除了安装上述两个babel的loader之外，还必须安装babel的插件，babel-preset的插件,告诉babel按照哪个规范编译
             * babel-preset是存储JavaScript不同标准的插件，通过使用正确presets，告诉babel按照哪个规范编译；
             * presets的常见规范：es2015，es2016,es2017,env(es2015，es2016,es2017以及多种浏览器的支持规范,通常采用),babel-preset-stage
             *
             * 
             */
    	 	test:/\.js$/, 
    	 	use:{
                 loader:'babel-loader',// 需要通过npm安装babel-loader，@babel/core，才能使用babel
                 option:{
                    presets:[
                        [
                            "@babel/preset-env", // 需要通过npm 安装@babel/preset-env这个babel插件
                            {
                                targets:{
                                    browsers:[">1%"] //配置安装全世界浏览器占有率超过1%的兼容的js打包
                                }
                            }
                        ]
                    ]
                 }
    	 	}
    	 },
    	]
    }
}
```
- 编译es6、es7的方法（比如promise等方法，async）：babel-polyfill,babel-plugin-transform-runtime babel-runtime
1. babel-polyfill

```
/**
 * babel只能编译es6、es7的语法，如果要编译es6的方法，则需要用到babel-polyfill
 * 通过npm 安装 babel-polyfill
 * 在入口文件里引入babel-polyfill 即可使用
 * babel-polyfill 的原理：在全局用es5重写了es6的方法；
 * babel-polyfill缺点会使项目体积增大
 */
import "babel-polyfill"; 
new Promise(setTimeout(()=>{
	console.log(1);
}));
async function a(){

}
```
2. babel-plugin-transform-runtime babel-runtime 生效方式

```
module.exports = {
    entry: {
        app: './app.js'
    },

    output: {
        filename: '[name].[hash:8].js'
    },
    module:{
    	rules:[
    	 {
            /**
             * 编译js，主要是将es6，es7的语法编译成浏览器支持的es5，
             * 所需要的loader：babel-loader，@babel/core（用来解析babel-loader的）；
             * 除了安装上述两个babel的loader之外，还必须安装babel的插件，babel-preset的插件,告诉babel按照哪个规范编译
             * babel-preset是存储JavaScript不同标准的插件，通过使用正确presets，告诉babel按照哪个规范编译；
             * presets的常见规范：es2015，es2016,es2017,env(es2015，es2016,es2017以及多种浏览器的支持规范,通常采用),babel-preset-stage
             */
    	 	test:/\.js$/, 
    	 	use:{
                 loader:'babel-loader',// 需要通过npm安装babel-loader，@babel/core，才能使用babel
                 option:{
                    presets:[
                        [
                            "@babel/preset-env", // 需要通过npm 安装@babel/preset-env这个babel插件
                            {
                                targets:{
                                    browsers:[">1%"] // 配置全世界浏览器占有率超过1%的兼容的js打包
                                }
                            }
                        ]
                    ],
                    /**
                     * 对es6的方法的编译：babel-plugin-transform-runtime babel-runtime 
                     * npm 安装 babel-plugin-transform-runtime babel-runtime，
                     * 注意：babel-plugin-transform-runtime babel-runtime 作为babel的插件，必须跟@babel/core的版本相同
                     * 如果之前安装@babel/core，则安装runtime时必须安装@babel版本的runtime
                     * npm install @babel/plugin-transform-runtime @babel/runtime 
                     * babel-plugin-transform-runtime 原理：生成用es5重写es6的局部对象，对没有使用es6到的方法则不会重写；
                     */
                    plugins:[
                        [
                            "@babel/transform-runtime"
                        ]
                    ]
                 }
    	 	}
    	 },
    	]
    }
}
```
- 编译es6、es7的语法糖：装饰器，ts,vue,jsx等等


webpack.config.js
```
module.exports = {
    entry: {
        app: './app.js'
    },

    output: {
        filename: '[name].[hash:8].js'
    },
    module:{
    	rules:[
            
         /**
          * 编译es6，es7的语法糖，以ts为列
          * npm 安装 typescript ts-loader；
          * 新建一个tsconfig.json 配置文件
          */
         {
            test:/\.tsx?$/,
            use:'ts-loader' // npm 安装ts-loader
         }
    	]
    }
}
```
tsconfig.json
```
{
	"compilerOptions":{
		"module":"commonjs",
		"target":"es5",
	},
	"exclude":["./node_modules"]
}

```




