export function setupEditorSync(editor, idMap, renderAST, options = {}) {
  const debounceDelay = options.debounceDelay ?? 200;

  let debounceTimer = null;

  const handleInput = () => {
    // 防抖
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const sel = window.getSelection();
      if (!sel.rangeCount) return;

      let node = sel.anchorNode;
      if (node.nodeType === 3) node = node.parentNode;
      while (node && node !== editor && !node.classList.contains("line")) {
        node = node.parentNode;
      }
      if (!node || node === editor) return;

      const id = node.dataset.id;
      const astNode = idMap.get(id)?.node;
      if (!astNode) return;

      // 去除 block 标识，并且去除首尾的空白字符
      astNode.content = node.textContent.replace(/^\s*-\s*/, "").trim();
      renderAST();
    }, debounceDelay);
  };

  editor.addEventListener("input", handleInput);

  // 提供解绑函数
  return () => {
    editor.removeEventListener("input", handleInput);
    clearTimeout(debounceTimer);
  };
}
