import { parentPort } from 'worker_threads';
function performTimeConsumingFunction(data: string): string {
  return `Processed: ${data}`;
}

let progress = 0;
const totalSteps = 100;

if (parentPort) {
  // 执行与 parentPort 相关的操作
  parentPort.on('message', (data: string) => {
    try {
      //   const interval = setInterval(() => {
      //     progress++;
      //     if (parentPort) {
      //       parentPort.postMessage({ progress });
      //     }
      //     if (progress === totalSteps) {
      //       clearInterval(interval);
      //       progress = 0;
      //     }
      //   }, 100);
      async function updateProgress() {
        for (let progress = 1; progress <= 100; progress++) {
          if (parentPort) parentPort.postMessage({ progress });
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        const result = performTimeConsumingFunction(data);
        if (parentPort) parentPort.postMessage(result);
      }
      updateProgress();
    } catch (error) {
      if (parentPort) {
        parentPort.postMessage({ error: 'An error occurred during processing.' });
      }
    }
  });
} else {
  console.log('No parent port available.');
}
