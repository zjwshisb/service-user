module.exports = {
  env: {
    NODE_ENV: '"staging"'
  },
  defineConstants: {
    BASE_URL: '"http://119.29.196.153:9090/user"',
    WS_URL: '"ws://119.29.196.153:9090/user/ws"'
  },
  mini: {},
  h5: {

    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
