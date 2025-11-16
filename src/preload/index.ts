import { contextBridge } from 'electron' // ipcRenderer
import { electronAPI } from '@electron-toolkit/preload'
import { sindriFiles } from './openFile'
import { sindriFilesSaveAs } from './saveAsFile'

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('sindriFiles', sindriFiles)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.sindriFiles = { ...sindriFiles, ...sindriFilesSaveAs }
  // @ts-ignore (define in dts)
  window.electron = electronAPI
}
