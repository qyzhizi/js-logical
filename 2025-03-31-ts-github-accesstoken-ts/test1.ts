export async function fetchGitHubUserInfo(accessToken: string): Promise<any> {
    const userUrl = "https://api.github.com/user";
  
    try {
      const response = await fetch(userUrl, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("请求失败：", error);
      throw error;
    }
  }


  