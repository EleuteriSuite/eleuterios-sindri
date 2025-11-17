// main.js
import path from 'path'

const { app, ipcMain } = require('electron');
const express = require('express');
const serveStatic = require('serve-static');
const http = require('http');

let previewServer = null;

async function startSindriServer(rootDir) {
  // Si ya tienes un server, podrías cerrarlo y abrir otro
  if (previewServer?.server) {
    previewServer.server.close();
    previewServer = null;
  }

  const appExpress = express();

  appExpress.use(serveStatic(rootDir, {
    index: ['index.html'],
  }));

  const server = http.createServer(appExpress);

  // Puerto 0 => el SO elige uno libre
  await new Promise((resolve, reject) => {
    server.listen(0, '127.0.0.1', (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });

  const { port } = server.address();
  const url = `http://127.0.0.1:${port}/`;

  previewServer = { server, url, rootDir };
  return previewServer;
}

export function setupServerStatic() {
  app.on('before-quit', () => {
    if (previewServer?.server) {
      previewServer.server.close();
    }
  });

  ipcMain.on('sindri:start-preview', async (event, filePath: string) => {
    try {
      const baseDir = path.dirname(filePath)
      const sindriBaseDir = path.join(baseDir, '.sindri')
      const previewServer = await startSindriServer(sindriBaseDir);

      console.log('previewServer', previewServer);
      if (previewServer && previewServer.server && previewServer.url && previewServer.rootDir) {
        event.sender.send('sindri:loaded-preview', {
          url: previewServer.url,
          rootDir: previewServer.rootDir
        })
      }
    } catch (err) {
      console.error('Error to setup preview:', err)
    }
  });

}
