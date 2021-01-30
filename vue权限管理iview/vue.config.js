const path = require("path");
// 配置自适应插件
const px2rem = require("postcss-px2rem");
// 配置基本大小  和rem.js 配置一样
const postcss = px2rem({
  remUnit: 192
});
// 定义resolve加载路径
const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  lintOnSave: false,
  publicPath: "",
  // 输出文件目录
  outputDir: "dist",
  // 放置静态资源的地方 (js/css/img/font/...)
  assetsDir: "assets",

  // webpack配置
  // 方便开发的配置（颗粒化配置webpack方法），主要配置
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("_g", resolve("src/components"))
      .set("&", resolve("src/assets/images"));
  },
  configureWebpack: () => {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [postcss]
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // parallel: require("os").cpus().length > 1,
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: true, //配置自动启动浏览器
    host: "0.0.0.0",
    port: 8080, // 前端项目启动端口号
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      "/api": {
        target: "http://localhost:8080", //配置开发环境跨域请求服务地址
        changeOrigin: true, //改变源
        ws: true, //是否代理websockets
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    before: require('./mock/index.js') // 引入mock/index.js
  },
  lintOnSave: false,
  // 第三方插件配置
  pluginOptions: {}
};
