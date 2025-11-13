import { app, shell, BrowserWindow, Tray, Menu, screen, globalShortcut } from 'electron';
import { join } from 'path';
import { is } from '@electron-toolkit/utils';
import { autoUpdater } from 'electron-updater';

let tray: Tray | null = null;
let isQuiting = false;

export function createWindow(): void {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    show: false,
    autoHideMenuBar: true,
    icon: join(__dirname, '../../resources/icon.ico'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: join(__dirname, '../preload/index.js'),
      webviewTag: true,
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  tray = new Tray(join(__dirname, '../../resources/icon.ico'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Mostrar', click: () => mainWindow.show() },
    {
      label: 'Salir',
      click: () => {
        isQuiting = true;
        app.quit();
      },
    },
  ]);
  tray.setToolTip('sindri notebook');
  tray.setContextMenu(contextMenu);

  mainWindow.on('close', (event) => {
    if (!isQuiting) {
      event.preventDefault();
      mainWindow.hide();
      mainWindow.setSkipTaskbar(true);
    }
  });

  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    mainWindow.hide();
    mainWindow.setSkipTaskbar(true);
  });

  app.on('ready', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
    mainWindow.webContents.openDevTools();
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const express = require('express');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { createProxyMiddleware } = require('http-proxy-middleware');

    const server = express();

    const buildPath = join(__dirname, '../renderer');
    server.use(express.static(buildPath));

    server.use(
      '/api',
      createProxyMiddleware({
        target: 'https://api-v5.eleuterios.org/api',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      })
    );

    server.get('*', (req: any, res: any) => {
      console.log(req.url);
      res.sendFile(join(buildPath, 'index.html'));
    });

    const PORT = 3527;
    server.listen(PORT, () => {
      console.log('Proxy escuchando en el puerto 3000');
    });

    mainWindow.loadURL(`http://localhost:${PORT}`);
  }

  globalShortcut.register('Ctrl+Shift+I', () => {
    mainWindow.webContents.openDevTools();
  });

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' https://eleuterios.org/ https://*.eleuterios.org/; " +
            "script-src 'self' 'unsafe-inline'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' https: data:; " +
            "connect-src 'self' https://eleuterios.org;",
        ],
      },
    });
  });
}
