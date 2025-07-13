import { readFile } from "fs";

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
  if (line.startsWith("- TODO")) return "todo";
  if (line.startsWith("- DONE")) return "done";
  return "paragraph";
}

function parseLogseqExtended(text) {
  const lines = text.split(/\r?\n/);
  const stack = []; // [ [indent, node] ]
  const root = [];

  for (let line of lines) {
    const trimmed = line.trim();
    const isBlockStart = /^- /.test(trimmed);

    if (isBlockStart) {
      const type = detectBlockType(trimmed);
      const content = trimmed.slice(2).trim(); // remove "- "

      const indent = line.length - line.trimStart().length;
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

    } else if (trimmed) {
      // continuation line
      if (stack.length > 0) {
        const parentNode = stack[stack.length - 1][1];
        parentNode.content += "\n" + trimmed;
      }
    }
  }

  return root;
}


// 运行入口
const inputFile = "multiLinesBlock2.md";
readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const ast = parseLogseqExtended(data);

  for (const node of ast) {
    console.log(JSON.stringify(node.toJSON(), null, 2));
  }
});
