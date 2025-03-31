import { fetchGitHubUserInfo } from './test1';

async function getUserInfo() {
    const res = await fetchGitHubUserInfo('ghu_Uk12q1YreQFntg5TEVS5HUPjGhvLLf0DI2Pi');
    console.log(res);
}

getUserInfo();
