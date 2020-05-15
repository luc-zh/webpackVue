# <center>2020.5.15 webapck4搭建vue2.0项目基本配置</center>
#### ***1.*** 新建名WebpckaConfig文件夹
#### ***2.*** 使用命令
````
 npm init -y
````
- #### 在WebpackConfig文件中生成package.josn
#### ***3.*** 下载依赖包
`````
 npm install webpack webpack-dev-server webpack-cli -D
`````
#### ****4.**** 新建是src文件夹并在src创建main.js文件
- #### alert(hello world)
#### ****5.**** 新建webpack.config.js文件
- #### webpack.config.js文件
````
var path = require('path');               
var config = {                          
  entry: './src/main.js',            
  output: {                            
    path: path.resolve(__dirname ,'dist'),
    filename: '[name].build.js',
    publicPath: '/dist/'径     
  } 
} 
module.exports = config;
````

- #### entry:引入文件,对象写法可以引入多个文件
`````
entry:{
        app:'./src/app.js'
        vendors:'./src/vendors.js
    }
``````
- ****output:文件输出地址****

- ****path:输出文件地址****

- ****filename:输出文件名****

- ****publicPath:文件输出路径****

 #### ****6.**** 新建一个index.js文件并引入main.js
`````
    <!DOCTYPE html>
     <html> 
         <head>         
            <meta charset="UTF-8">         
            <meta name="viewport" content="width=device-width, initial-scale=1.0">        
            <meta http-equiv="X-UA-Compatible" content="ie=edge">         
         <title>Document</title> 
        </head> 
        <body>         
             <script src="/dist/main.build.js"></script> 
        </body> 
    </html>
`````
#### ****7.****  配置package.js
`````
"dev": "webpack-dev-server --open --hot",     
"build": "webpack --mode=development --progress --hide-modules"
`````
- #### 配置以后运行 npm run dev 
- #### 会弹出一个 hello word
- #### 但是webpack会有一个警告，这个警告就是因为没有配置mode,就是没有配置相应模式
- #### mode有两个参数，一个是开发模式development一个是生产模式production。
- #### 可以在package.json里直接配置
`````
 "dev": "webpack-dev-server --mode=development --open --hot"
`````  
- #### 这样就没有警告了
- #### 接下来运行
`````
npm run build
`````
- #### 会打包生成一个dist文件夹
![Image](https://github.com/luc-zh/webpackVue/blob/master/1.png)
#### ****8.**** 引入loader兼容代码
````
npm install babel-loader babel-core babel-preset-env -D
````
- #### babel-preset-env 帮助我们配置 babel。我们只需要告诉它我们要兼容的情况（目标运行环境），它就会自动把代码转换为兼容对应环境的代码
`````
module: {     
  rules: [         
    {                 
      test: '/\.js$/',             
      include: path.resolve(__dirname + '/src'),             
      exclude: /node_modules/,             
    use: [                 
           {                     
              loader: 'babel-loader',                     
              options: ['env', 'stage-0']                 
            }             
          ]         
    }     
  ] 
}
`````
#### ****9.**** 下载vue并在main.js 引入
````
npm install vue 
````
````
import Vue from 'vue'; 
new Vue({       
  el: '#app',       
  data: 
  {              
    msg: 'hello'       
  } 
})
````
- #### 运行显目发现报错
````
vue.runtime.esm.js:620 [Vue warn]: You are using the runtime-only build of Vue
where the template compiler is not available. Either pre-compile the templates 
into render functions, or use the compiler-included build. 
(found in <Root>)
````
- #### 报这个错误原因就是因为使用的是运行版本的vue,编译版本不能用，这时候在我们需要随后我们还要配置别名，将 resolve.alias 配置为如下对象
````
resolve: {           
  alias: {                 
    'vue$': 'vue/dist/vue.esm.js'                           
  }     
}
````
- #### 然后再运行项目,发现已经在页面上打印出来hello
- #### 一个简单的基于webpack的vue项目已经搭建好了
#### ****10.**** 配置css
````
npm install style-loader css-loader -
D
````
- #### 配置module中的rules
````
{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
````
- #### 测试一番新建index.css并在main.js中引入
````
import './index.css'
````
````
div:{
  color:"red"
}
````
- #### 可以看到文字颜色已经变红了
![Image](https://github.com/luc-zh/webpackVue/blob/master/2.png)
#### ****11.**** 支持图片
````
npm install file-loader url-loader -
D
````
- #### 配置module中的rules
````
{
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          }]
      }
````
- #### 测试一番新建asset文件夹放一张图片并在main.js中引入
````
import logo from './asset/img.png'
````
- #### 在HTML中添加
````
<img :src='logo' alt='logo'>
````
#### ****12.**** 引入html-webpack-plugin
````
npm install html-webpack-plugin -D
````
- #### 要引入
`````
var HtmlWebpackPlugin = require('html-webpack-plugin');
`````
- #### 进行配置plugins
````
 plugins: [new HtmlWebpackPlugin()]
````
#### ****13.**** vue开发需要.vue文件只要引入vue-loader和vue-template-compiler
````
npm install vue-loader vue-style-loader 
vue-template-compiler -D
````
- #### 进行配置vue-loader
````
{
        test: /\.vue$/,
        loader: 'vue-loader'
      }
````
- #### 还需要引入vue-loader/lib/plugin
````
const VueLoaderPlugin = require('vue-loader/lib/plugin');
````
- #### 配置plugin
````
  plugins: [
   
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new VueLoaderPlugin()
  ]
````
- #### 在src中新建App.vue
````
<template>  
  <h1>{{msg}}</h1>
</template> 
<script>  
  export default {    
    data(){
      return{
        msg:"hello wrod"
      }
    } 
  }
</script> 
<style>
    //编写css样式
</style>
````
- ####  再更改main.js
````
import Vue from 'vue';
import App from './App.vue';

new Vue({
  render: h => h(App)
}).$mount("#app");
````
![Image](https://github.com/luc-zh/webpackVue/blob/master/5.png)
#### ****14.**** 开启js热更新
- #### 因为 vue-style-loader 封装了 style-loader，热更新开箱即用,但是 js 热更新还不能用，每次修改代码我们都会刷新浏览器，所以我们需要继续配置。
````
const webpack=require(webpack)
````
- #### 进行配置plugin
````
  plugins: [
   
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin()

  ]
````
- #### 热更新已经开启,现在为止webpack构建vue项目已经跑起来了,再进行一些优化
#### ****15.**** 在resolve配置别名
````
resolve: {       
    extensions: ['.js', '.jsx','.ts','.tsx', '.scss','.json','.css'],       
    alias: {             
      'vue$': 'vue/dist/vue.esm.js',             
      "@": path.resolve(__dirname, 'src'),             
      "components": path.resolve(__dirname, '/src/components'),             
      "utils": path.resolve(__dirname + '/src/utils'),         
    },         
    modules: ['node_modules']    
  }
````
#### ****16.**** 支持sass
````
npm install sass-loader node-sass -D
````
- #### 修改rules中的css
````
{
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
        
          'sass-loader',
        ],
      }
````
#### ****17.**** 配置vue-router
````
npm install vue-router
````
- #### 在src中新建一个component文件夹,新增A.vue和B.vue
`````
<template>
    <div>
        这是一个组件A
    </div>
</template>
<script>
export default {
    
}
</script>
`````
`````
<template>
    <div>
        这是一个组件B
    </div>
</template>
<script>
export default {
    
}
</script>
`````
- #### 再新创建一个router.js 
`````
import Vue from 'vue';
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes:[{
        path:'/',
        component:()=>import('./components/A.vue')
    },
    {
        path:"/b",
        component:()=>import('./components/B.vue')
    }
]
})
`````
- #### 把router.js 引入main.js中
`````
import Vue from 'vue';
import App from './App.vue';
import router from './router'
new Vue({
  router,
  render: h => h(App)

}).$mount("#app");
`````
- #### 修改App.vue
````

<template>
  <div>
    <h1>hello world</h1>
    <router-link to="/b">这是组件B</router-link>
    <router-link to="/">这是组件A</router-link>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {};
  }
};
</script>

<style lang="sass">

</style>

````
- #### 进行项目运行
````
npm run dev
````
![Image](https://github.com/luc-zh/webpackVue/blob/master/6.png)








----





