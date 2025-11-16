import { ipcRenderer } from 'electron'

// Custom APIs for renderer
export const sindriFilesSaveAs = {
  save: (filePath: string, content: string): void => {
    ipcRenderer.send('file:save', filePath, content)
  },
  saveAsDialog: (content: string): void => {
    ipcRenderer.send('file:save-as-dialog', content)
  },
  onFileSaved: (
    callback: (payload: {
      canceled?: boolean
      path?: string
      name?: string
      ext?: string
      content?: string
    }) => void
  ): void => {
    ipcRenderer.removeAllListeners('file:saved')
    ipcRenderer.on('file:saved', (_event, response) => callback(response))
  }
}
