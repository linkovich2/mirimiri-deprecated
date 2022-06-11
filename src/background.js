'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

const { Settings } = require('./system')
const settings     = new Settings();

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    minWidth: 800,
    minHeight: 600,
    title: 'MiriMiri',
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (settings.fullscreen) {
    win.setFullScreen(true)
  } else {
    // restore window size and position
    win.setSize(settings.width, settings.height)

    if (settings.maximized) {
      win.maximize()
    }

    if (settings.position !== undefined) {
      win.setPosition(settings.position[0], settings.position[1])
    }
  }

  win.on('close', (e) => {
    // save window position for restoration
    if (!win.isFullScreen()) {
      settings.position  = win.getPosition()
      let size           = win.getSize()
      settings.width     = size[0]
      settings.height    = size[1]
      settings.maximized = win.isMaximized()

      settings.save()
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// API Methods to handle saving and loading
// @todo move these somewhere sane ?
ipcMain.handle('get-settings', async (event, data) => {
  return settings
})

ipcMain.handle('update-settings', async (event, data) => {
  let win = BrowserWindow.getFocusedWindow()
  // respond to the fullscreen change here, because might as well
  if (data.fullscreen && !settings.fullscreen) {
    win.setFullScreen(true)
  } else if (!data.fullscreen && settings.fullscreen) {
    win.setFullScreen(false)
  }

  settings.fullscreen  = data.fullscreen
  settings.skip_splash = data.skip_splash
  settings.save()
})

ipcMain.handle('quit', async (event, data) => {
  let win = BrowserWindow.getFocusedWindow()
  win.close()
})
