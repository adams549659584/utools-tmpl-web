/**
 * @type { import ('../types/utools').PluginConfig }
 */
const pluginConfig = {
  pluginName: 'utools-tmpl-web',
  version: 'v1.0.0',
  description: 'utools 单页面应用模板',
  author: '罗君',
  homepage: 'https://github.com/adams549659584/utools-tmpl-web',
  main: 'index.html',
  preload: 'preload.js',
  logo: 'img/logo.png',
  platform: ['win32'],
  // development: {
  //   main: '',
  //   preload: '',
  //   logo: '',
  //   buildPath: '',
  // },
  // pluginSetting: {
  //   single: true,
  //   height: 0,
  // },
  features: [
    {
      code: 'utools_web',
      explain: '单页面应用模板',
      cmds: ['hello', 'web'],
    },
  ],
};
export default pluginConfig;
