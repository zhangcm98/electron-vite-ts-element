import { app, BrowserWindow } from 'electron';
// import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url';
import { Worker } from 'worker_threads';
import { ipcMain } from 'electron';
import path from 'node:path';
// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;
const workerPath = path.join(__dirname, 'excelWorker.js');
let worker: Worker;

let win: BrowserWindow | null;
function startWorker(event: Electron.IpcMainEvent, fileName: string) {
  if (worker) {
    worker.terminate();
    console.log('worker.terminate();');
  }
  worker = new Worker(workerPath);
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);

  const dataFromRenderer = fileName;

  worker.postMessage(dataFromRenderer);
  worker.on('message', (result) => {
    if (win && result.progress) {
      win.webContents.send('progress-update', result.progress);
      console.log('excelWorker result.progress:', result.progress);
    } else {
      // 这里处理 Worker 线程返回的针对特定任务的结果
      console.log('excelWorker result:', result);
    }
  });
}

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
    show: false,
  });

  ipcMain.on('get-fileName', startWorker);
  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
    win?.setTitle('electron+vue+vite+ts');
    win?.show();
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
