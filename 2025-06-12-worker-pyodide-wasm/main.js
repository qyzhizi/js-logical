import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.mjs";

let pyodide;
let numpyFsSnapshot = [];

async function preloadPyodideAndNumpy() {
  pyodide = await loadPyodide();
  await pyodide.loadPackage("numpy");

  const numpyDir = "/lib/python3.11/site-packages/numpy";

  // 递归读取目录和文件
  function readDirRecursive(dir) {
    let entries = pyodide.FS.readdir(dir).filter(f => f !== "." && f !== "..");
    console.log(`Reading directory: ${dir}`, entries)
    let files = [];

    for (const entry of entries) {
      const path = `${dir}/${entry}`;
      const stat = pyodide.FS.stat(path);

      if (stat.mode & 0o40000) { // 如果是目录
        files = files.concat(readDirRecursive(path));
      } else {
        // 读文件二进制数据
        const data = pyodide.FS.readFile(path, { encoding: "binary" });
        files.push({ path, data });
      }
    }
    return files;
  }

  numpyFsSnapshot = readDirRecursive(numpyDir);
}

document.getElementById("start").addEventListener("click", async () => {
  if (!pyodide) {
    await preloadPyodideAndNumpy();
  }

  const worker = new Worker("worker.js");

  // 传递文件二进制数据的 ArrayBuffer 以实现转移
  const transferable = numpyFsSnapshot.map(f => f.data.buffer);

  worker.postMessage(
    {
      numpyFiles: numpyFsSnapshot
    },
    transferable
  );

  worker.onmessage = (e) => {
    console.log("Worker result:", e.data);
  };
});
