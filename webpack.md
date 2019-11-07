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
                  option: {}, // loader的配置项 // loader的顺序是从后往前执行
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
2.指定配置文件名打包： webpack --config <configfile>
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

# 7、css的编译和处理

## 1、如何引入css文件

webpack是以js为入口打包的，那么项目的css怎么引入？

css可以通过js文件引入，但必须使用相应的loader

1. css-loader，让css可以被js正确的引入
2. style-loader，让css被引入后可以被正确的以一个style标签插入页面
3. 两者的顺序很重要，要先经过css-loader处理，再由style-loader处理。

## 2、style-loader的核心配置

1. insertAt    style标签插入在哪一块区域

2. insertInto 插入指定的dom

3. singleton 是否合并为一个style标签

4. transform 在浏览器环境下，插入style到页面前，用js对css进行操作

   ```
   use:[
       {
           loader:"style-loader",
           options:{
               insertAt:"top" , // 将style标签插入到head的哪个位置，top表示head头，bottom表示head						   // 尾，默认为尾，参数也可以是个对象，
               insertAt:{
                   before:"#mydiv", // 表示将style标签插入到某个div前面,一般不会指定
               },
               singleton:true, // 将style标签合并，默认为false
               transform:"./transform.js", // 在浏览器环境下，插入style到页面前，指定js文件对css进                                         // 行操作，指定的路径为相对路径
           }
       }
   ]
   ```

   ```
   // transform.js
    module.exports=function(css){
    // 里面可以操作window对象
    // css是字符串，只能对字符串进行操作；
     if(window.screen.width<500){
     	css=css.replace('red','yellow');
     }
     return css;
   }
   ```

   ## 3、css-loader的核心配置

   1. minimize 是否压缩css，webpack4.x中移除

   2. module 是否使用css模块化

   3. alias css中的全局别名 webpack4.x 移除

      ```
      use:[
          {
              loader:"style-loader",
              options:{
                  insertAt:"top" , // 将style标签插入到head的哪个位置，top表示head头，bottom表示head						   // 尾，默认为尾，参数也可以是个对象，
                  insertAt:{
                      before:"#mydiv", // 表示将style标签插入到某个div前面,一般不会指定
                  },
                  singleton:true, // 将style标签合并，默认为false
                  transform:"./transform.js", // 在浏览器环境下，插入style到页面前，指定js文件对css进                                         // 行操作，指定的路径为相对路径
              },
              {
                   loader:'css-loader',
                   options:{
                     modules:{
                     module:true, // 开启css模块化
                      localIdentName:'[path][name]_[local]_[hash:4]' // 定制class类名，设置css-modules模式下local类名的命名
                     }                    
                   } 
                 },
          }
      ]
      ```

      ```
      css module 的使用
      1. :global(.class|#id) 声明全局规则，凡是这样声明的class，都不会被编译成hash字符串
      :global(#box) {
      
          }
      :global{
              #box{
      
              }
          }
      2. :local(.class) 在局部作用域中声明选择器，建议使用驼峰式命名，这样可以更容易在 js 中引用
      3. composes: className 用来组合其他类
      :local(.className) {
          // ...
      }
      :local(.cn) {
          composes: className; // 组合局部作用域的规则
          // composes: className from 'xxx.css'; // 组合其他文件中的规则
      }
      // js 中引用
      import styles from 'index.less';
      
      export default const Index = () => (
          <div className={styles.appContainer}>
              <div className={styles.appBody}></div>
          </div>
      );
      开启了css-module ，必须通过js来控制css，也就是要在js中引入css，通过向js对象一样引用css样式
      
      ```

      ## 4、less，sass 预处理语言

      1. less、sass是css预处理语言，用来帮助我们更方便的写css。更方便团队合作

      2. less、sass浏览器无法直接识别，需要编译成css才能被识别。所以我们写的less、sass的文件都需要编译

      3. less、sass编译所需loader

         ```
         less所需要的loader
         less
         less-loader 
         -----------
         sass所需要的loader
         sass-loader
         node-sass
         
         ```

#         5、css提取：如何把css提取为单独的文件

1. 安装对应的插件：extract-text-webpack-plugin
2. 改造loader处的写法：把use改为使用extract-text-webpack-plugin
3. 在plugin处添加：把extract-text-webpack-plugin加入到plugin里

```
版本差异：在webpack3.x中：直接安装npm i extract-text-webpack-plugin webpack --save-dev
		在webpack4.x中：npm i extract-text-webpack-plugin@next webpack --save-dev
		必须在局部安装webpack，因为该插件是用局部的webpack打包的
		
		
var extractTextCss=require('extract-text-webpack-plugin');
module.exports= {
	entry:{
	 app:"./app.js",
	},
	output:{
		path:__dirname+"/src/dist",
		filename:"./[name].bundle.js"
	},
 	resolve:{
     alias: {
       a2:"./js/app2.js",
     }
 	},
	module:{
		rules: [
     {
       test:/\.less$/,
       use:extractTextCss.extract({
       // fallback的值是style-loader的配置
        fallback:{
           loader:'style-loader',
           options:{
            //insertInto:"#mydiv",
            singleton:true,
            transform:"./transform.js"
           }
         },
         // use属性的值是css-loader等其它相关配置
          use:[     
           {
             loader:'css-loader',
             options:{
               modules:{
                localIdentName:'[path][name]_[local]_[hash:4]'
               }                    
             } 
           },
           // 使用postcss-loader 需安装的loader
           // cnpm install postcss postcss-loader autoprefixer postcss-cssnext --save-dev
           // 引入的顺序在css-loader之前，在其它预处理语言之后
           {
             loader:'postcss-loader', 
             options:{
              ident:'postcss', // 给谁使用的
              // postcss 使用的插件
              plugins:[
               require('autoprefixer')({
                   "overrideBrowserslist":[">1%","last 2 versions"] // 指定浏览器版本，否则不生效
               }),
               require('postcss-cssnext')() // 兼容下一代css语法
              ]
             }
           },
           {
            loader:'less-loader'
           }        
          ]         
       })
     }
		]
	},
  plugins:[
   new extractTextCss({
    filename:'[name].min.css'
   })
  ]
}

// 在package.json 中统一配置指定autoprefixer，babel-loader的浏览器版本
{
  "name": "webpack-3.1.6",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^3.0.0",
    "postcss-cssnext": "^3.1.0",
    "style-loader": "^0.23.1"
  },
  "dependencies": {
    "autoprefixer": "^9.6.1",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "less": "^3.9.0",
    "less-loader": "^5.0.0",
    "postcss": "^7.0.17",
    "postcss-loader": "^3.0.0",
    "webpack": "^4.35.3"
  },
  // 在package.json 中统一配置指定autoprefixer，babel-loader的浏览器版本,此处配置了之后，就不用在webpack.config.js 中单独配置了
  "browserslist": [
    ">1%",
    "last 2 versions"
  ]
}


```

# 8、html的生成

## 1、需要用到的plugin

cnpm install html-webpack-plugin --save-dev

## 2、相关配置

filename：打包生成后html文件的名字，必须的，相对路径

template：指定一个html文件为模版，必须的，相对路径

minify：压缩html

inject：是否把js，css文件插入到html，插入到哪

chunks：多入口时，指定引入chunks

```
var extractTextCss=require('extract-text-webpack-plugin'); // css代码分离
var htmlWebpackPlugin=require('html-webpack-plugin'); // 生成html文件
module.exports= {
    // 定义多入口
	entry:{
	 app:"./app.js",
	 app2:"./app2.js"
	},
	// 定义输出
	output:{
		path:__dirname+"/src/dist",
		filename:"./[name].bundle.js",
	},
	// 定义别名
 	resolve:{
     alias: {
       a2:"./js/app2.js",
     }
 	},
 	// 编码规则
	module:{
		rules: [
     {
       test:/\.less$/,
       use:extractTextCss.extract({
        fallback:{
           loader:'style-loader',
           options:{
            //insertInto:"#mydiv",
            singleton:true,
            //transform:"./transform.js"
           }
         },
        use:[
         {
           loader:'css-loader',
           options:{
             modules:{
              localIdentName:'[path][name]_[local]_[hash:4]'
             }                    
           } 
         },
         {
          loader:'less-loader'
         }        
        ]
       })
     }
		]
	},
	// webpack引入的插件
  plugins:[
   new extractTextCss({
    filename:'[name].min.css'
   }),
   new htmlWebpackPlugin({
   	filename:"index.html", // 必须，指定输入的html文字
   	template:"./index.html",// 必须,指定html模版
    chunks:['app'] // 指定引入的入口文件打包之后的文件
   })
  ]
}
```

9、cross-env：运行跨平台设置和使用环境变量的脚本

要理解 process.env.NODE_ENV 就必须要了解 process，process 是 node 的全局变量，并且 process 有 env 这个属性 ,可以通过cross-env 设置运行跨平台设置和使用环境变量的脚本。 

1、作用：当我们使用 NODE_ENV = production 来设置环境变量的时候，大多数windows命令会提示将会阻塞或者异常，或者，windows不支持NODE_ENV=development的这样的设置方式，会报错。因此 cross-env 出现了。我们就可以使用 cross-env命令，这样我们就不必担心平台设置或使用环境变量了。也就是说 cross-env 能够提供一个设置环境变量的scripts，这样我们就能够以unix方式设置环境变量，然而在windows上也能够兼容的。 

2、安装：npm i cross-env --save-dev 

3、在package.json中的script命令如下设置

```
"scripts": {
    "pre": "yarn --registry https://registry.npm.taobao.org || npm install --registry https://registry.npm.taobao.org ",
    "dev": "cross-env NODE_ENV=development webpack --config webpack.dev.config.js",
    "build": "cross-env NODE_ENV=production webpack --config webpack.dev.config.js",
    "lint": "vue-cli-service lint"
  },
```

4、通过这样设置 就可以在项目中的任何文件中使用

let env = process.env.NODE_ENV