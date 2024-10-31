import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import { Worker } from "worker_threads";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
const workerPath = path.join(__dirname, "excelWorker.js");
let worker;
let win;
function startWorker(event, fileName) {
  if (worker) {
    worker.terminate();
    console.log("worker.terminate();");
  }
  worker = new Worker(workerPath);
  const webContents = event.sender;
  const win2 = BrowserWindow.fromWebContents(webContents);
  const dataFromRenderer = fileName;
  worker.postMessage(dataFromRenderer);
  worker.on("message", (result) => {
    if (win2 && result.progress) {
      win2.webContents.send("progress-update", result.progress);
      console.log("excelWorker result.progress:", result.progress);
    } else {
      console.log("excelWorker result:", result);
    }
  });
}
function createWindow() {
  win = new BrowserWindow({
    width: 1e3,
    height: 800,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    },
    show: false
  });
  ipcMain.on("get-fileName", startWorker);
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
    win == null ? void 0 : win.setTitle("electron+vue+vite+ts");
    win == null ? void 0 : win.show();
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
