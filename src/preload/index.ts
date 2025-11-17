import { contextBridge } from 'electron' // ipcRenderer
import { electronAPI } from '@electron-toolkit/preload'
import { sindriFiles } from './openFile'
import { sindriFilesSaveAs } from './saveAsFile'
import { sindriServerStatic } from './serverStatic'

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('sindriFiles', { ...sindriFiles, ...sindriFilesSaveAs })
    contextBridge.exposeInMainWorld('sindriServerStatic', { ...sindriServerStatic })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.sindriFiles = { ...sindriFiles, ...sindriFilesSaveAs }
  // @ts-ignore (define in dts)
  window.sindriServerStatic = { ...sindriServerStatic }
  // @ts-ignore (define in dts)
  window.electron = electronAPI
}
