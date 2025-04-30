import { execSync } from "child_process";
const key = "taskid1"
const data = JSON.stringify(
    { 
      message: "test", 
      filePath: "test1.md",
      content: "test"
    }
);
// const namespaceId = "74d2ad8750a046579407548f6f4a12e2";
const namespaceId = "60468f68d2af4653a06078c6e0a97178";


execSync(`npx wrangler kv key put '${key}' '${data}' --namespace-id=${namespaceId} --remote`, { stdio: "inherit" });


const result = execSync(`npx wrangler kv key get '${key}' --namespace-id=${namespaceId} --remote`).toString();
const jsonData = JSON.parse(result);
console.log(jsonData);

