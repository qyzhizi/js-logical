// test.js
function add(x, y) {
  return x + y;
}

function benchmark(label) {
  let sum = 0;
  const t1 = performance.now();
  for (let i = 0; i < 1_000_000; i++) {
    sum += add(i, i);
  }
  const t2 = performance.now();
  console.log(`${label} -> Time taken: ${(t2 - t1).toFixed(2)} ms`);
}

// 场景 A：无预热，直接跑
benchmark("No warm-up");

// 场景 B：显式预热并触发 JIT
%PrepareFunctionForOptimization(add);
for (let i = 0; i < 10000; i++) add(i, i);
%OptimizeFunctionOnNextCall(add);
add(1, 2);
benchmark("With warm-up & optimize");
