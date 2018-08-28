module.exports = async (ctx, renderer) => {
  ctx.headers['Content-Type'] = 'text/html'
  const context = { url: ctx.path }

  try {
    await renderer.renderToString(context, (err, html) => {
      if (!err) {
        ctx.body = html
      }
    })
  } catch (er) {
    ctx.status = 500
    throw er
  }
}
