import { contextBridge } from 'electron' // ipcRenderer
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
/*const sindriElectronApi = {
  //getImportData: () => ipcRenderer.send('getImportData'),
  //onImportDataResult: (callback) => ipcRenderer.on('importDataResult', (event, response) => callback(response, event)),
}*/

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    // contextBridge.exposeInMainWorld('sindriElectronApi', sindriElectronApi)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  // window.sindriElectronApi = sindriElectronApi
  // @ts-ignore (define in dts)
  window.electron = electronAPI
}
