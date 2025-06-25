importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");

let pyodide = null;

onmessage = async (event) => {
  const { numpyFiles } = event.data;

  if (!pyodide) {
    pyodide = await loadPyodide();
    await pyodide.loadPackage("numpy");
  }

  const writableRoot = "/tmp/numpy";

  // 创建根目录
  try {
    pyodide.FS.mkdirTree(writableRoot);
  } catch {}

  for (const { path, data } of numpyFiles) {
    // 计算相对路径
    const relPath = path.split("/lib/python3.11/site-packages/numpy/")[1];
    const targetPath = `${writableRoot}/${relPath}`;

    // 创建文件夹
    const dirs = targetPath.split("/").slice(0, -1).join("/");
    try {
      pyodide.FS.mkdirTree(dirs);
    } catch {}

    // 写入文件
    console.log(`Wrote file: ${targetPath}`);
    pyodide.FS.writeFile(targetPath, new Uint8Array(data));
  }

  // 把写入的 numpy 路径加入 sys.path
//   await pyodide.runPythonAsync(`
// import sys
// sys.path.insert(0, '${writableRoot}')
//   `);

  // 测试 numpy 是否正常
  await pyodide.runPythonAsync(`
import sys
sys.path.insert(0, '${writableRoot}')
import numpy as np
print("Numpy loaded from:", np.__file__)
result = np.mean([1, 2, 3, 4, 5])
  `);

  const result = pyodide.globals.get("result");
  postMessage({ result });
};
