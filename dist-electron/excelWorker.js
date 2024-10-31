import { parentPort } from "worker_threads";
function performTimeConsumingFunction(data) {
  return `Processed: ${data}`;
}
if (parentPort) {
  parentPort.on("message", (data) => {
    try {
      async function updateProgress() {
        for (let progress2 = 1; progress2 <= 100; progress2++) {
          if (parentPort) parentPort.postMessage({ progress: progress2 });
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        const result = performTimeConsumingFunction(data);
        if (parentPort) parentPort.postMessage(result);
      }
      updateProgress();
    } catch (error) {
      if (parentPort) {
        parentPort.postMessage({ error: "An error occurred during processing." });
      }
    }
  });
} else {
  console.log("No parent port available.");
}
