// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut, Tray, Menu} = require('electron')
const path = require('path')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: './public/tray-cat.png',
    frame: false,
    transparent: true,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  ;[1, 2, 3, 4, 5, 6].forEach(v => globalShortcut.register(`CommandOrControl+${v}`, () => {
    mainWindow.webContents.send('change-cat', v)
    mainWindow.show()
  }))
  return mainWindow
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

function createTray(win) {
  const tray = new Tray('./public/tray-cat.png')
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '隐藏',
      click: () => {
        win.hide()
      }
    },
    {
      label: '显示',
      click: () => {
        win.show()
      }
    }
  ])
  tray.setToolTip('一直缩小的小猫')
  tray.setContextMenu(contextMenu)
  return tray
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const win = createWindow()
  createTray(win)

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
