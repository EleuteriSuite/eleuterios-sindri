import { ipcRenderer } from 'electron'

// Custom APIs for renderer
export const sindriFiles = {
  openDialog: (): void => {
    ipcRenderer.send('file:open-dialog')
  },
  onFileContent: (
    callback: (payload: {
      canceled?: boolean
      path?: string
      name?: string
      ext?: string
      content?: string
    }) => void
  ): void => {
    ipcRenderer.removeAllListeners('file:content')
    ipcRenderer.on('file:content', (_event, response) => callback(response))
  }
}
