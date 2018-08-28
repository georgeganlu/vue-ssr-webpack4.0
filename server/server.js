const Koa = require('koa')
const path = require('path')
const send = require('koa-send')
const rouerEntryRender = require('./route/server.entry')
const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

// 第一部先做一个通用型的拦截的请求。
app.use(async (ctx, next) => {
  try {
    console.log(`request url is :${ctx.path}`)
    await next()
  } catch (err) {
    ctx.status = 500
    if (isDev) {
      console.log(err.message)
      ctx.body = err.message
    } else {
      ctx.body = 'plasea try again later'
    }
  }
})

// 处理图标
app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', {root: path.join(__dirname, '../')})
  } else {
    await next()
  }
})

app.use(rouerEntryRender.routes()).use(rouerEntryRender.allowedMethods())

const HORT = process.env.HORT || '192.168.12.51'
const PORT = process.env.PORT || 2222

app.listen(PORT, HORT, () => {
  console.log(`服务运行地址是http://${HORT}:${PORT}`)
})
