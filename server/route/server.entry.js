// 进入server-entry的5部曲。
const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const MemoryFs = require('memory-fs')
const renderHtml = require('./sever.render')
const serverConfig = require('../../build/webpack.server.config')
const webpack = require('webpack')

// 先使用webpack编译serverConfig
const serverCompile = webpack(serverConfig)
const mfsObj = new MemoryFs()
serverCompile.outputFileSystem = mfsObj

let serverBuildx
serverCompile.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => {
    console.log(err)
  })
  stats.warnings.forEach(warn => console.warn(err))

  serverBuildx = JSON.parse(mfsObj.readFileSync(
    path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json'),
    'utf-8'
  ))
  console.log(`server build is OK`)
})

const handSSR = async (ctx) => {
  if (!serverBuildx) {
    ctx.body = '请稍等,webpack编译ok'
  }

  // 第二步去前台获取devServer生成的clientManifest.json数据。
  const clientManifestRest = await axios.get(
    'http://192.168.12.51:8005/public/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestRest.data

  // 第三步去获取模板
  const template = fs.readFileSync(
    path.join(__dirname, '../index.template.html'),
    'utf-8'
  )

  // 第四步去生成renderer对象。--利用vue-server-renderer
  const renderer = createBundleRenderer(
    serverBuildx,
    {
      template,
      clientManifest,
      runInNewContext: false
    }
  )

  await renderHtml(ctx, renderer)
}

const router = new Router()
router.get('*', handSSR)

module.exports = router
