use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn double(n: i32) -> i32 {
    n * 2
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    web_sys::console::log_1(&format!("Hello, {name}!").into());
}


static mut COUNTER: i32 = 0;

// 标注这个函数作为模块启动时自动调用
#[wasm_bindgen(start)]
pub fn start() {
    // 初始化静态变量或者做启动时配置
    unsafe {
        COUNTER = 42;
    }
    web_sys::console::log_1(&"Wasm 模块初始化完成，COUNTER 设置为 42".into());
}

// 导出一个函数，读取初始化的状态
#[wasm_bindgen]
pub fn get_counter() -> i32 {
    unsafe { COUNTER }
}
