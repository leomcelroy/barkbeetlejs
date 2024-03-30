import { makeProfile } from "./makeProfile.js";
import { makePocket } from "./makePocket.js";

onmessage = (e) => {
  const { state, params, type } = e.data;

  console.log(e.data);
  
  const result = {
    "profile": makeProfile,
    "pocket": makePocket
  }[type](state, params);

  self.postMessage(result);

  self.close();
};

// let GLOBAL_WORKER = null;
export function profilePocketWorker(state, params, type) {
  
  // if (GLOBAL_WORKER !== null) {
    // GLOBAL_WORKER.terminate();
    // GLOBAL_WORKER = null;
  // }

  return new Promise(async (resolve) => {
    const url = `${window.location.origin}${window.location.pathname}src/profilePocketWorker.js`
    const worker = new Worker(url, { type: "module" });

    // if (cache) GLOBAL_WORKER = worker;

    worker.postMessage({
      state,
      params,
      type
    });

    worker.onmessage = e => {
      const message = e.data;
      resolve(message);
    };

    worker.onerror = e => {
      console.error(e);
      // GLOBAL_WORKER.terminate();
      // GLOBAL_WORKER = null;
    }
  });
}
