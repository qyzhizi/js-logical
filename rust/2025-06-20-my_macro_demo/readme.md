运行命令:
```
-> % cargo run -p logfn_user
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.02s
     Running `target/debug/logfn_user`
>>> Entering function: add
<<< Leaving function: add
Result: 5
```

`cargo run -p logfn_user` 是一条 **在 Rust workspace 中运行指定 crate 的命令**。

---

## 🔍 分解解释：

### 🔧 `cargo run`

这是 Cargo 的标准命令，用于：

* 编译项目（如果还没编译或有改动）
* 然后运行项目中的 **可执行文件（main.rs）**

### 🔹 `-p logfn_user`

这是 `--package` 的简写，指定你要运行 workspace 中的哪个包（crate）。

---

## 🎯 为什么需要 `-p`？

当你在一个 **多 crate 的 workspace** 中时，`cargo run` 可能不知道你想运行哪一个 crate。比如你有这样的结构：

```
my_macro_demo/
├── logfn_macro/   # 只定义宏，不可运行
└── logfn_user/    # 有 main 函数，可执行
```

你必须明确告诉 Cargo：

```bash
cargo run -p logfn_user
```

否则它会报错或者默认找不到运行目标。

---

## ✅ 所以这条命令的意思是：

> 在当前 workspace 中，**运行 `logfn_user` crate 对应的可执行程序**。

---

如果你进入了 `logfn_user/` 目录，也可以简写为：

```bash
cargo run
```

因为当前目录已经是你要运行的 crate 根。

是否还想了解 `cargo` 的其他用法？比如 `cargo build`, `cargo test`, `cargo bench`, `cargo install`？
