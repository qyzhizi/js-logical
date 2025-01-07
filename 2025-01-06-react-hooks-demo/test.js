let hooks = []; // 模拟 React 的状态存储
let currentHookIndex = 0; // 用于记录当前 Hook 的索引

function useState(initialValue) {
  const hook = hooks[currentHookIndex] || { state: initialValue, queue: [] };
  hooks[currentHookIndex] = hook;

  function setState(newValue) {
    hook.state = newValue;
  }

  currentHookIndex++; // 每调用一次 Hook，索引加1
  return [hook.state, setState];
}

function Component() {
  currentHookIndex = 0; // 每次渲染前重置索引
  console.log("currentHookIndex: ", currentHookIndex)

  const [count, setCount] = useState(0); // 第一次调用 useState, currentHookIndex = 0
  const [name, setName] = useState("React"); // 第二次调用 useState, currentHookIndex = 1

  console.log(count, name);

  // 假装触发更新
  setCount(1);
  setName("Updated React");
}

// 模拟组件渲染两次
Component(); // 输出: 0 "React"
Component(); // 输出: 1 "Updated React"
