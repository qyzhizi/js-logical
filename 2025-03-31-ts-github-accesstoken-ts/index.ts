import { fetchGitHubUserInfo } from './test1';

async function getUserInfo() {
    const res = await fetchGitHubUserInfo('xx_access_token_xx');
    console.log(res);
}

getUserInfo();
