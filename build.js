const { build } = require('electron-builder')
const path = require('path')

build({
  projectDir: path.resolve(__dirname),
  win: ['nsis', 'portable'],
  config: {
    appId: 'space.luoming.electron.desktop-cat',
    productName: '可爱小猫',
    directories: {
      output: 'build/win'
    },
    win: {
      icon: path.resolve(__dirname, './public/tray-cat.png')
    }
  }
})
