"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test1_1 = require("./test1");
async function getUserInfo() {
    const res = await (0, test1_1.fetchGitHubUserInfo)('ghu_Uk12q1YreQFntg5TEVS5HUPjGhvLLf0DI2Pi');
    console.log(res);
}
getUserInfo();
