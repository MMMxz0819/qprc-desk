module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        electronDownload: {
          cache: 'C:ele/electron/Cache',
          mirror: 'https://npm.taobao.org/mirrors/electron/',
        },
      },
    },
  },
}
