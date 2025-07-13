import { readFile } from 'fs';

class ASTNode {
  constructor(content, type = "paragraph", children = []) {
    this.content = content.trim();
    this.type = type;
    this.children = children;
  }

  toJSON() {
    return {
      type: this.type,
      content: this.content,
      children: this.children.map(child => child.toJSON())
    };
  }
}

function detectBlockType(line) {
  if (line.startsWith("- TODO")) {
    return "todo";
  } else if (line.startsWith("- DONE")) {
    return "done";
  } else {
    return "paragraph";
  }
}

function parseLogseqExtended(lines) {
  const stack = []; // [ [indent, node] ]
  const root = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].replace(/\r?\n$/, '');
    if (!rawLine.trim()) continue;

    const indent = rawLine.length - rawLine.trimStart().length;
    const trimmed = rawLine.trim();
      console.log(`Line ${i + 1}: "${rawLine}" | indent: ${indent} | isBlockStart: ${trimmed.startsWith("- ")}`);


    // 判断是否是新 block 起始
    const isBlockStart = trimmed.startsWith("- ");

    if (isBlockStart) {
      const type = detectBlockType(trimmed);
      const content = trimmed.slice(2).trim();

      const node = new ASTNode(content, type);

      while (stack.length > 0 && indent <= stack[stack.length - 1][0]) {
        stack.pop();
      }

      if (stack.length > 0) {
        stack[stack.length - 1][1].children.push(node);
      } else {
        root.push(node);
      }

      stack.push([indent, node]);
    } else {
      // 非 block 行：作为上一个 block 的内容补充
      const parentIndent = indent - 2;
      // 从后往前找符合缩进的父级 block
      for (let j = stack.length - 1; j >= 0; j--) {
        const [prevIndent, parent] = stack[j];
        if (prevIndent === parentIndent) {
          parent.content += '\n' + trimmed;
          break;
        }
      }
    }
  }

  return root;
}

// 运行入口
const inputFile = "multiLinesBlock.md";
readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const lines = data.split("\n");
  const ast = parseLogseqExtended(lines);

  for (const node of ast) {
    console.log(JSON.stringify(node.toJSON(), null, 2));
  }
});
