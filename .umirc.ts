import { defineConfig } from '@umijs/max';
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  chainWebpack(memo) {
    memo.plugin('sentry').use(SentryWebpackPlugin, [
      {
        ignore: ['node_modules'],
        include: './dist', //上传dist文件的js
        configFile: './sentryclirc', //配置文件地址，这个一定要有，踩坑在这里，忘了写导致一直无法实现上传sourcemap
        release: '1.0.1', //版本号，自己定义的变量，整个版本号在项目里面一定要对应
        deleteAfterCompile: true,
        urlPrefix: '~/', // js的代码路径前缀
      },
    ]);
  },
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'yarn',
});
