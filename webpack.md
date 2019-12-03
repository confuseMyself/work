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

3.常用的loader列举，loader 是 对某种类型的文件的解析，loader的顺序是从下往上加载的

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

# 9、cross-env：运行跨平台设置和使用环境变量的脚本

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

# 10、webpack的环境

## 1、为什么要区分环境

在不同的场景下可能需要不同的配置，使用不同的功能，所以要区分环境。

比如：

开发模式：会额外用到一些调试功能，比如webpack-dev-server，但是为了加快调试速度，可能不会用上压缩，tree-shaking之类的功能

生产模式：为了减少文件体积，会使用压缩，tree-shaing等功能，但是不要如webpack-dev-server或者eslint这样的调试工具

## 2、具体列举一下生产环境和开发环境的不同

生产环境：

- 去除无用代码
- 图片压缩，转码base64，雪碧图
- 提取公用代码

开发环境

- webpack-dev-server  配置代理
- source-map
- 代码风格检查

## 3、如何告诉webpack当前环境

命令：webpack --env  ｛name｝

1. 把开发环境和生产环境的共同配置（公共代码）提取出来，命名为webpack.common.js
2. 开发环境单独配置webpack代码，并且引入webpack的共同配置，命名为webpack.dev.js
3. 生产环境单独配置 webpack代码，并且引入webpack的共同配置，命名为webpack.pro.js
4. 如果是开发环境，使用命令 webpack --config  webpack.dev.js --env dev，进行开发调试
5. 如果是生产环境，使用命令webpack --config  webpack.pro.js --env pro，进行打包

```
// webpack.common.js 公共环境的配置文件：生产环境和开发环境都需要的配置提取出来
const webpack=require('webpack');
const extractTextCss=require('extract-text-webpack-plugin'); // 提取css代码
const dev=require('./webpack.dev.js');  // 引入开发环境的特殊配置
const pro=require('./webpack.pro.js');  // 引入生产环境的特殊配置
const merge=require('webpack-merge');  // webpack-merge做了两件事：它允许连接数组并合并对象，而不是									 //	覆盖组合。把不同的环境下的webpack配置和公共环境的配置文件                                        // 合并到一起
module.exports=env=>{
  var postPlugins=[require('autoprefixer')(), require('postcss-cssnext')()];
  postPlugins.concat(env==='production'?[require('postcss-sprites')({
                                            spritePath: 'dist/sprite',
                                            retina: true
                                         })]:[])
  //配置对象
  var common={
     entry:'./app.js',
     output:{
     	filename:'bundle.js'
     },
     module:{
        rules: [  
           //js处理
           {
            test:/\.js$/,
            use:
              {
                loader:'babel-loader',
              }
           },
           //css处理
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
                   loader:'postcss-loader',
                   options:{
                    ident:'postcss',
                    plugins:postPlugins
                   }
                 },
                 {
                  loader:'less-loader'
                 }        
                ]         
             })
           },                   
        ] 
     },
     plugins:[
     //提取额外css文件
       new extractTextCss({
        filename:env==='production'?'app.bundle.css':'app.dev.css'
       })
     ]
  };
  //返回配置对象
  return merge(common,env==='production'?pro:dev);
}
```

## 4、如何编写不同的配置文件来区分环境

1. 编写一个开发环境下的配置文件
2. 编写一个生产环境下的配置文件
3. 在基础配置引入开发和生产配置
4. 判断env参数，合并对应的配置

```
webpack.dev.js
const webpack = require('webpack')
module.exports={
    devtool: 'cheap-module-source-map',
    devServer: {
        port: 9001,
        overlay: true,
        hot: true,
        hotOnly: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热更新
        new webpack.NamedModulesPlugin(), // 显示模块的相对路径
    ]	
}
```

```
webpack.pro.js
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html
module.exports={
      optimization: {
        minimize: false
      },    
	plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            minify: {
                collapseWhitespace: true // 开启打包
            },
            inject:true, // 生成的js，分离的css是否自动插入到html中
        }),         	
	]	
}
```

```
// webpack.common.js 公共环境的配置文件：生产环境和开发环境都需要的配置提取出来
const webpack=require('webpack');
const extractTextCss=require('extract-text-webpack-plugin'); // 提取css代码
const dev=require('./webpack.dev.js');  // 引入开发环境的特殊配置
const pro=require('./webpack.pro.js');  // 引入生产环境的特殊配置
const merge=require('webpack-merge');  // webpack-merge做了两件事：它允许连接数组并合并对象，而不是									 //	覆盖组合。把不同的环境下的webpack配置和公共环境的配置文件                                        // 合并到一起
module.exports=env=>{
  var postPlugins=[require('autoprefixer')(), require('postcss-cssnext')()];
  // postcss-sprites是postcss的一个插件，处理雪碧图的
  postPlugins.concat(env==='production'?[require('postcss-sprites')({
                                            spritePath: 'dist/sprite',
                                            retina: true
                                         })]:[])
  //配置对象
  var common={
     entry:'./app.js',
     output:{
     	filename:'bundle.js'
     },
     module:{
        rules: [  
           //js处理
           {
            test:/\.js$/,
            use:
              {
                loader:'babel-loader',
              }
           },
           //css处理
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
                   loader:'postcss-loader',
                   options:{
                    ident:'postcss',
                    plugins:postPlugins
                   }
                 },
                 {
                  loader:'less-loader'
                 }        
                ]         
             })
           },                   
        ] 
     },
     plugins:[
     //提取额外css文件
       new extractTextCss({
        filename:env==='production'?'app.bundle.css':'app.dev.css'
       })
     ]
  };
  //返回配置对象
  return merge(common,env==='production'?pro:dev);
}
```

## 5、为了打包方便，在 package.json 里script命令加入命名

```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --env production --config webpack.common.js",
    "dev": "webpack-dev-server --env development --config webpack.common.js"
  },
  "ke
```

## 6、webpack版本差异

在webpack4.x中更简单的环境区分

webpack --mode production/development/none

# 11、PostCSS详解

## 1、什么postcss

PostCSS基于js插件去转换css的一个工具。这些插件支持变量，mixin，未来的css语法，在线图片甚至更多。

所以PostCSS只是一个转化css的工具，让我们更好的去写css；

## 2、postcss一些常用的插件

autoprefixer是PostCSS最著名的一款插件，用来兼容不同浏览器的css语法，不同浏览器加上css前缀 
postcss-cssnext (内置autoprefixer) 允许你使用未来的css语法，如css4（可以理解为css中的Babel） 
postcss-sprites 自动制作雪碧图，不用手动拼接啦，哈哈哈 
cssnano 压缩css代码(如果你是用webpack的话，css-loader集成了cssnano，你不需要再次引入) 
postcss-hash-classname 把转换后的css文件名附上哈希值 
pixrem 将rem转换为px 
postcss-px-to-viewport 将px转换为vh和vw（推荐作为移动端的计量单位，而不是rem） 
postcss-pxtorem 将px转换为rem

## 3、postcss webpack配置

详见css的编译和处理

# 12、webpack-dev-server 使用

1、什么是webpack-dev-server

- 项目最终都要打包上线，所以最好能模拟线上环境进行开发调试
- webpack-dev-server就是一个让我们可以模拟线上环境进行项目调试的工具

2、webpack-dev-server 提供的常用功能

- 路径重定向
- 浏览器中显示编译错误
- 接口代理
- 热更新

3、使用步骤

- 安装webpack-dev-server

- 配置 devServer字段

- 利用命令行开启服务

  4、devServer常用配置

  - inline：服务的开启模式
  - port：代理接口
  - historyApiFallback：路径重定向
  - hot：热更新
  - lazy：懒编译，多入口时，当访问某个入口时，才会对该入口进行编译和服务
  - overlay：错误遮罩
  - proxy：代理请求

```
module:...,
devServer:{
        port: 9001, // 代理接口
        inline:true, // 服务开启模式
        overlay:true, // 错误遮罩
        hot:true, // 热更新:在不刷新浏览器的情况下更改代码之后，会在浏览器上面显示更改之后的代码。
        	      // webpack-dev-server 热更新这个插件，与extract-text-webpack-plugin这个插件不兼                   // 容,所以在开发环境时，需要关闭这个插件，在生产环境时打开这个插件，同时关闭热更新这                   // 个功能。
        hotOnly:true, // 表示只用热更新，不用dev-loading刷新页面
        // 对url路径重定向
        historyApiFallback:{
          rewrites:[
           {
             from:/^\/([ -~]+)/,
             to:function(context){
               return './'+context.match[1]+'.html'
             }
           }
          ]
        },
        // 代理请求，对webpack-dev-server进行代理转发
        proxy:{
          "/smartSpec":{
            target:"https://mooc.study.163.com/",
            changeOrigin:true, // 把http请求中的origin字段进行变换，在浏览器收到后端回复的时候，浏览                                // 器会以为这个是本地请求，而在后端那边会以为是站内的调用。这样，通过这                                // 个简单的配置，就完美的解决了跨域的问题。
            // 对代理路径的一些规则配置，
            // 表示匹配到/smartSpec/qd以这个开头的路径，代理到/smartSpec/detail/1202816603.htm这个             // 路径上面
            pathRewrite:{
              "^/smartSpec/qd":"/smartSpec/detail/1202816603.htm"
            },
            // 对代理请求设置请求头的配置
            headers:{
                
            }
          },

        }
     },
      plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            minify: {
                collapseWhitespace: true
            },
            inject:true,
        }),     
      new extractTextCss({
        filename:"app.bundle.css",
        disable:false //热更新:在不刷新浏览器的情况下更改代码之后，会在浏览器上面显示更改之后的代码。
        	         // webpack-dev-server 热更新与extract-text-webpack-plugin这个插件不兼                             // 容,所以在开发环境时，需要关闭这个插件，在生产环境时打开这个插件，同时关闭热更                       // 新这个功能。只需要把disable置为false即可。
      }),
    ] 
```

# 13、souce-map

为了方便调试，我们需要知道打包后的代码对应源文件的位置。

- 如果代码有一处错误，无souce-map只能追踪到错误发生在打包后文件的哪个位置，但是打包后的文件就不方便阅读。
- 有了souce-map，就可以查看错误发生在原模块的哪个地方。

1、souce-map配置向如下

```
devtool:'eval-source-map',  
```

# 14、webpack原理解析

- webpack依赖与node的环境与文件操作系统
- webpack的打包过程，其实就是利用node去读取文件，然后进行一些字符串处理后，再利用node去写入文件

loader原理

loader其实是一个方法：接收一个字符串，方法内部处理完后再返回字符串。

```
// resouce表示读取到文件生成的字符串
module.exports = function(resouce){

    var reg = /console.log\((.+?)\)/g;

    return resouce.replace(reg,"");

}
```

# 15、webpack等资源的处理

1、需要用到哪些loader

- file-loader：引入各种资源的loader，图片，视频，字体图标等资源
- url-loader：url-loader是file-loader的二次封装，一般用url-loader来替代file-loader，还增加了一些其它功能；比如把图片转换成base64编码
- img-loader：用来用来优化图片的，主要用来压缩图片
- html-loader：处理html里面引入各种资源的loader，默认只会处理某些标签的src属性处理 

2、雪碧图的合成

| postcss-sprites                                              | webpack-spritesmith                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 属于postcss插件，会自动把css文件中引入的背景图合成雪碧图，并修改css文件 | 属于一个独立的插件，会按照指定的路径指定的图片类型，生成一个雪碧图，和一个雪碧图相关的css，不会修改css |

```
var extractTextCss = require('extract-text-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');
const webpackSpriteSmith = require('webpack-spritesmith') // webpack自带的雪碧图插件
const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    app: "./src/app.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "./[name].bundle.js",
    publicPath: "./", // 打包后，指定通过script标签引入html中的css和js的路径的前缀
  },
  resolve: {
    alias: {
      a2: "./js/app2.js",
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractTextCss.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              //insertInto:"#mydiv",
              //transform:"./transform.js"
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                /*modules:{
                 localIdentName:'[path][name]_[local]_[hash:4]'
                }   */
              }
            },
            // postcss-loader本身不具有功能，起作用的是其他的插件，相当于一个插槽
            // postcss-loader 放在所有css的loader之后
            // 确定，按照原图的大小生成雪碧图，所以会存在定位误差
            {
              loader: "postcss-loader",
              options: {
                plugins: [
                  /* require('postcss-sprites')({
                     spirtePath:"./dist/assets/sprite" 指定生成的雪碧图存放的位置
                   })*/
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|jgeg|gif)$/,

        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     //默认是[hash].[ext]
          //     name: '[name].[hash:4].[ext]', // name为图片原始文件名， ext为后缀名
          //     outputPath: "assets/img", // 指定文件打包输出的路径；css里自动会根据打包的路径自动更改为打包后的路径
          //     publicPath: "assets/img", // 指定打包后的css路径加的路径前缀
          //   }
          // },
          // url-loader 是file-loader的二次封装，一般用来代替file-loader
          {
            loader: 'url-loader',
            options: {
              //默认是[hash].[ext]
              name: '[name].[hash:4].[ext]', // name为图片原始文件名， ext为后缀名
              outputPath: "assets/img", // 指定文件打包输出的路径；css里自动会根据打包的路径自动更改为打包后的路径
              publicPath: "assets/img", // 指定打包后的css路径加的路径前缀
              limit: 5000 // 当资源小于5kb时，会把资源转换成base64编码
            }
          },
          // img-loader 用来优化图片的loader，本身不具有功能，通postcss一样，起作用的是其他的插件，相当于一个插槽
          {
            loader: 'img-loader',
            options: {
              plugins: [
                // 压缩png
                require('imagemin-pngquant')({ 
                  speed: 2  //1-11
                }),
                // 压缩jpg
                require('imagemin-mozjpeg')({
                  quality: 80  //1-100
                }),
                // 压缩gif
                require('imagemin-gifsicle')({
                  optimizationLevel: 1   //1,2,3
                })
              ]
            }
          },
        ]
      },
      // html-loader 处理html里面引入各种资源的loader
      // 不引入html-loader，可以通过webpack自带的处理方式，模版语法 <img src="${require('./assets/img/img4.jpg')}"/>
      // html-loader 默认只会处理某些标签的src属性处理
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ["img:data-src"]
          }
        }
      },
      {
        test: /\.etf$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ["img:data-src"]
          }
        }
      }
    ]
  },
  plugins: [
    new extractTextCss({
      filename: '[name].min.css'
    }),
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    // webpack自带雪碧图的插件配置
    new webpackSpriteSmith({
      src: {
        //图片来源文件夹
        cwd: path.join(__dirname, "src/assets/img"),
        //处理什么图片
        glob: "*.jpg"
      },
      target: {
        //打包到哪
        image: path.join(__dirname, 'dist/sprites/sprite.png'),
        css: path.join(__dirname, 'dist/sprites/sprite.css'),
      },
      apiOptions: {
        cssImageRef: "./sprites/sprite.png"
      }
    })
  ]
}
```

# 16、代码分割，js代码大小控制

## 1、多页应用：多个入口，多个输出

提取公共依赖：把多个页面的用到的依赖打包成一个单独的文件

## 2、单页应用：单个入口，单个输出

减少文件体积，拆分应用；

把需要异步加载改成异步加载

## 3、总结起来，打包的一般经验规则

| 多页                                         | 单页面应用                                   |
| -------------------------------------------- | -------------------------------------------- |
| 用于服务端渲染、前端路由为服务端控制的       | 应用为主，前端路由为hash控制                 |
| 主业务代码+公共依赖+第三房包+webpack运行代码 | 主业务代码+异步模块+第三方包+webpack运行代码 |

## 4、如何进行代码分割

| webpack3.x                         | webpack4.x             |
| ---------------------------------- | ---------------------- |
| webpack自带插件 commonChunksPlugin | SplitChunksPlugin 配置 |

```
var extractTextCss=require('extract-text-webpack-plugin');
var htmlWebpackPlugin=require('html-webpack-plugin');
const webpackSpriteSmith=require('webpack-spritesmith');
const webpack=require('webpack');
const UglifyJs=require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path=require('path');
module.exports= {
  mode:'production', // webpack4.x之后，把mode设置成production，打包时候会自动开启代码压缩和tree-shaking
	entry:{
	 app:"./src/app.js",
	},
	output:{
		path:__dirname+"/dist",
		filename:"./[name].bundle.js",
  },

  // optimization属性是webpack4.x里控制代码分割，代码压缩的配置项
  optimization:{
    // 控制代码压缩
    minimize:true,
    // webpack4.x 通过配置splitChunks来实现代码分割
    splitChunks:{
      name:true,
      chunks:"all", // 有三个值：initial(只对入口文件进行分割)、all（对所有文件进行分割）、async（对异步文件进行分割）
      minSize:0, // 对大小小于多少的进行提取，代码分割，设置为0表示不管模块大小都进行分割
      // 对模块的自定义提取
      cacheGroups:{
        mode1:{
          test:/mode1/, //正则表达式，匹配文件名为mode1 的模块
        },
        vendor:{
          test:/([\\/node_modules[\\/])/, // 表示提取node_modules里的第三方模块
          name:"vendor", // 指定提取出来的名字为vendor
        },
      }
    },
    // 提出webpack的运行代码
    runtimeChunk:true
  },
	module:{
		rules: [    
     {
       test:/\.css$/,
       use:extractTextCss.extract({
        fallback:{
           loader:'style-loader',
           options:{
            //insertInto:"#mydiv",
            //transform:"./transform.js"
           }
         },
        use:[
         {
           loader:'css-loader',
           options:{
             /*modules:{
              localIdentName:'[path][name]_[local]_[hash:4]'
             }   */                 
           } 
         },
        ]
       })
     },
     {
      test:/\.(png|jpg|jgeg|gif)$/,
      use:[
        {
          loader:'url-loader',
          options:{
            //默认是[hash].[ext]
            name:'[name].[hash:4].[ext]',
            outputPath:"assets/img",
            publicPath:"assets/img",
            limit:5000
          }
        },
        {
          loader:'img-loader',
          options:{
            plugins:[
              require('imagemin-pngquant')({
                speed:2//1-11
              }),
              require('imagemin-mozjpeg')({
                quality:80//1-100
              }),
              require('imagemin-gifsicle')({
                optimizationLevel:1//1,2,3
              })
            ]
          }
        },
      ]
     },
    {
      test:/\.html$/,
      use:{
        loader:'html-loader',
        options:{
          attrs:["img:data-src"]
        }
      }
    } 
		]
	},
  plugins:[
   new extractTextCss({
    filename:'[name].min.css'
   }),
   new htmlWebpackPlugin({
   	filename:"index.html",
   	template:"./src/index.html",
   }),
   // 清楚之前的打包dist文件
   new CleanWebpackPlugin(),


   // webpack3.x 代码分割的配置
   // 拆分 第三房包代码
   /*new webpack.optimize.CommonsChunksPlugin({
     name:'vendor',
     minChunks:'infinity' // 表示无论出现多少次都会拆分
   }),
   // 拆分 webpack运行代码
   new webpack.optimize.CommonsChunksPlugin({
     name:'manifest',
     minChunks:'infinity'
   }),

   // 拆分业务代码
   new webpack.optimize.CommonsChunksPlugin({
     name:'app.js',
     minChunks:2
   }),*/   
   //new webpack.optimize.UglifyJsPlugin();
  ]
}
```

5、代码体积控制

- 代码压缩
- tree-shaking

tree-shaking对export default 出的代码不友好，不能tree-shaking

```
module.exports=function(){
	console.log("a");
	function a(){

	}
	function b(){
		
	}
}
// 这种export 的代码不能tree-shaking
```

```javascript
// 对这种代码 比较友好
export const a=function(){
	console.log('i am a');
}
export const b=function(){
	console.log('i am b');
}
```

# 17、webpack 优化打包速度

***有哪些可以优化的点***

- 项目本省

​       减少依赖嵌套深度

​       使用尽可能少的处理

- webpack层面

​       dll处理：预先处理第三方包的处理，预先把第三方包打包

​       通过include减少loader范围

​       happyPack：开启node多进程来处理webpack打包，如果处理的文件少，可能适得其反

​       uglify优化：webpack4.x废除uglify，webpack4.x里已经自带了代码压缩缓存功能。

​       减少resolve,sourcemap,cache-loader

​       用新版本的node和webpack

***长缓存优化***

- 把hash改为chunkhash：哪个模块改动了，hash值才会变化
- NamedChunksPlugin和NamedModulesPlugin （webpack自带）
- mini-css-extract-plugin：css代码分离，按模块提取

