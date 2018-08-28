// const docsLoader = require('./doc-loader')

module.exports = (isDev) => {
  return {
    preserveWhitepace: true, // 去除template模板里面的空格。
    extractCSS: !isDev // css的提取，是否单得打包，或是放在.vue文件中。
    // cssModules: {},  // 模块的功能
    // hotReload: false,  // 根据环境变量生成。
    // loaders: {   // 自定义模块的功能，主要是用来说明块。
    //     'docs': docsLoader
    // }
  }
}
