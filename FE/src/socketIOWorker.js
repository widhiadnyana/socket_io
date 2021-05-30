// Library imports
const { Worker } = require("worker_threads");

// Constants
const MAX_WORKERS = 50;

// Functions
const runService = (workerData) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./test.js", { workerData });
        worker.on("message", resolve);
        worker.on("error", reject);
        worker.on("exit", (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
};

const run = async () => {
    for (let i = 1; i <= MAX_WORKERS; i++) {
        runService(i);
    }
};

run().catch((err) => console.error(err));
