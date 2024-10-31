import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(ElementPlus);
app.mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message);
  });
  const setButton = document.getElementById('btn') as HTMLButtonElement;
  const fileNameInput = document.getElementById('fileName') as HTMLInputElement;
  setButton.addEventListener('click', () => {
    const fileName = fileNameInput.value;
    window.ipcRenderer.send('get-fileName', fileName);
  });

  window.ipcRenderer.on('progress-update', (event, progress) => {
    const progressBar = document.getElementById('progress');
    if (progressBar) {
      progressBar.style.width = `${(progress / 100) * 100}%`;
    }
  });
});
