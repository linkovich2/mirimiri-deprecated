const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      customFileProtocol: './',
      builderOptions: {
        appId: 'com.lightlychard.miri',
        productName: 'MiriMiri',
        win: {
          icon: 'src/assets/icon.ico',
          target: [ 'nsis' ]
        },
        nsis: {
          installerIcon: 'src/assets/icon.ico',
          uninstallerIcon: 'src/assets/icon.ico',
          oneClick: false,
          allowToChangeInstallationDirectory: true
        }
      }
    }
  }
})
