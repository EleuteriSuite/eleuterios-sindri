import { ipcMain, dialog } from 'electron'

import fs from 'fs'
import path from 'path'

// Open file dialog and return content
export function setupOpenFilesIpc() {
  ipcMain.on('file:open-dialog', async (event) => {
    try {
      const result = await dialog.showOpenDialog({
        title: 'Abrir archivo',
        properties: ['openFile'],
        filters: [
          { name: 'Text/Markdown', extensions: ['txt', 'md'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      })

      if (result.canceled || result.filePaths.length === 0) {
        event.sender.send('file:content', { canceled: true })
        return
      }

      const filePath = result.filePaths[0]
      const ext = path.extname(filePath).toLowerCase().replace('.', '')
      const name = path.basename(filePath)
      const content = await fs.promises.readFile(filePath, 'utf-8')

      event.sender.send('file:content', {
        path: filePath,
        name,
        ext,
        content
      })
    } catch (err) {
      console.error('Error opening file:', err)
      event.sender.send('file:content', { canceled: true })
    }
  })
}
