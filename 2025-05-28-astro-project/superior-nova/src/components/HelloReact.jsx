import React, { useState } from 'react';

export default function HelloReact() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>React 组件计数器：{count}</p>
      <button onClick={() => setCount(count + 1)}>点我加1</button>
    </div>
  );
}
