import { ipcMain, dialog } from 'electron'

import fs from 'fs'
import path from 'path'

// Recursive copy directory
const copyDirectory = async (srcDir: string, destDir: string) => {
  await fs.promises.mkdir(destDir, { recursive: true })
  const entries = await fs.promises.readdir(srcDir, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath)
    } else if (entry.isFile()) {
      await fs.promises.copyFile(srcPath, destPath)
    }
    // Other types ignored (symlinks, etc.)
  }
}

// Ensure .sindri directory exists in target folder; if not, create it and
// copy the template from sindri-previewer. Then write README.md with content.
const ensureSindriAndWriteReadme = async (
  baseDir: string,
  content: string
) => {
  const sindriDir = path.join(baseDir, '.sindri')

  // Check if .sindri exists; if not, create and populate from template
  let exists = true
  try {
    await fs.promises.access(sindriDir)
  } catch {
    exists = false
  }

  if (!exists) {
    await fs.promises.mkdir(sindriDir, { recursive: true })
    // Resolve the template directory next to this file at runtime
    const templateDir = path.resolve(__dirname, '..', '..', 'public', 'sindri-previewer')
    try {
      await copyDirectory(templateDir, sindriDir)
    } catch (e) {
      console.warn('Cannot create .sindri directory:', e)
    }
  }

  // write/rewrite README.md with content
  const readmePath = path.join(sindriDir, 'README.md')
  await fs.promises.writeFile(readmePath, content, 'utf-8')
}

const saveFile = async (event, filePath: string, content: string) => {
  const ext = path.extname(filePath).toLowerCase().replace('.', '')
  const name = path.basename(filePath)
  const baseDir = path.dirname(filePath)

  // Save file and README to .sindri and previewer
  await fs.promises
    .writeFile(filePath, content, 'utf-8')
    .then(async () => {
      await ensureSindriAndWriteReadme(baseDir, content)
    })
    .then(() => {
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
