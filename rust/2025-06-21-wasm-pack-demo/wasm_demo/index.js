import init, { get_counter, greet } from "./pkg/wasm_demo.js";

await init(); // 等价于 await __wbg_init()
console.log(get_counter()); // 调用 Rust 导出的函数
greet("lzp")
