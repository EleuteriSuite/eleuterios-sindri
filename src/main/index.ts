import { app, BrowserWindow, ipcMain, powerSaveBlocker } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createWindow } from './window'
import { setupOpenFilesIpc } from './openFiles'
import { setupSaveFilesIpc } from './saveAsFiles'
import { setupServerStatic } from './serverStatic'

// Evitar suspensión del sistema
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const id = powerSaveBlocker.start('prevent-app-suspension')
console.log(id)

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
}

// Inicialización de la app
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  setupOpenFilesIpc()
  setupSaveFilesIpc()
  setupServerStatic()

  // Ventana principal
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Cerrar cuando todas las ventanas se cierran (excepto macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
