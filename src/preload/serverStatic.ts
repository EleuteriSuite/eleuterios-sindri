import { ipcRenderer } from 'electron'

// Custom APIs for renderer
export const sindriServerStatic = {
  startPreview: (filePath): void => {
    ipcRenderer.send('sindri:start-preview', filePath)
  },
  onPreviewLoaded: (
    callback: (payload: {
      url?: string
      rootDir?: string
    }) => void
  ): void => {
    ipcRenderer.removeAllListeners('sindri:loaded-preview')
    ipcRenderer.on('sindri:loaded-preview', (_event, response) => callback(response))
  }
}
