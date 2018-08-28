import createApp from './create-app'

export default (context) => {
  return new Promise((resolve, reject) => {
    const {app, store, router} = createApp()
    if (context.url) {
      store.state.url = context.url
    }
    // 当app加载ok的时候把现在的url的请求路由推进路由的堆栈中列表中
    router.push(context.url)

    router.onReady(() => {
      const matchComponents = router.getMatchedComponents()
      if (!matchComponents.length) {
        console.log(`没有可用的组件`)
        return reject(new Error('no components matches'))
      }
      resolve(app)
    })
  })
}
