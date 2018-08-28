<!-- 启动ssr的过程 -->
npm install

1.首选需要修改 build/webpack.base.config.js里的 publicPath 为自己的ip地址。
2.修改 webpack.client.config.js的dev-server host为自己电脑ip
3.修改 server/route/server.entry.js 里面获到 clientManifest 数据的地址 http://192.168.12.51:8005/public/vue-ssr-client-manifest.json  里面的host部分。

4.修改node 服务启动的 HOST  server/server里面。

5.分别启动前台webpack-dev-server 和后台node服务，访问后台node地址就可以看到ssr渲染效果。


ssr的过程。 ---浏览器请求到后台服务后,进入到server.entry.

主要的过程。

1.先通过webpack(serverConfig)加载 拿到serverConfigCompile,在webpack加载的过程中会自动生成一个.vue-ssr-server-bundle.json后缀的json文件

2.拿到client端(webpack-dev-server)生成的前台.vue-ssr-client-manifest.json后缀的json文件。后台通过axios来请求前端dev-server的服务拿到。

3.拿到template.html.

4.通过vue-server-renderer的API createBundleRenderer生成renderer对象。

5.通过renderer.renderToString(context, (err, html)) 这个api来完成服务端渲染。
这里renderToString里面的context对象会做为实参传入 client/server.entry.js的方法中


