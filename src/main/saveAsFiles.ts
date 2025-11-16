import { ipcMain, dialog } from 'electron'

import fs from 'fs'
import path from 'path'

const saveFile = async (event, filePath: string, content: string) => {
  const ext = path.extname(filePath).toLowerCase().replace('.', '')
  const name = path.basename(filePath)
  await fs.promises.writeFile(filePath, content, 'utf-8').then(() => {
    event.sender.send('file:saved', {
      path: filePath,
      name,
      ext,
      content
    })
  })
}

// Open file dialog and return content
export function setupSaveFilesIpc() {
  ipcMain.on('file:save', async (event, filePath: string, content: string) => {
    try {
      await saveFile(event, filePath, content)
    } catch (err) {
      console.error('Error saving file:', err)
      event.sender.send('file:saved', { canceled: true })
    }
  })

  ipcMain.on('file:save-as-dialog', async (event, content: string) => {
    try {
      const result = await dialog.showSaveDialog({
        title: 'Guardar archivo como',
        filters: [
          { name: 'Text/Markdown', extensions: ['txt', 'md'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      })

      if (result.canceled || !result.filePath) {
        event.sender.send('file:saved', { canceled: true })
        return
      }

      const filePath = result.filePath

      await saveFile(event, filePath, content)
    } catch (err) {
      console.error('Error saving file:', err)
      event.sender.send('file:saved', { canceled: true })
    }
  })
}
