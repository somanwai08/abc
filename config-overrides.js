const {
  override,
  addWebpackAlias,
  addPostcssPlugins,
} = require('customize-cra')
const path = require('path')
const px2viewport = require('postcss-px-to-viewport')

const webpackAlias = addWebpackAlias({
  ['@']: path.resolve(__dirname, 'src'),
  ['@scss']: path.resolve(__dirname, 'src/assets/styles'),
})

const postcssPlugins = addPostcssPlugins([
  // 移动端布局 viewport 适配方案
  px2viewport({
    // 视口宽度：可以设置为设计稿的宽度
    viewportWidth: 375,
    // 白名单：不需对其中的 px 单位转成 vw 的样式类类名
    // selectorBlackList: ['.ignore', '.hairlines']
  }),
])

// 导出要进行覆盖的 webpack 配置
module.exports = override(webpackAlias, postcssPlugins)
