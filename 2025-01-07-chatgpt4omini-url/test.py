import os
import requests
import base64
    
# Configuration
API_KEY = "5shE2FHcogTanJam9iSoLqqMVZYB03kFa0MKvxgDdKMtBWBSlP4BJQQJ99AKACi0881XJ3w3AAAAACOGTYip"
# IMAGE_PATH = "YOUR_IMAGE_PATH"
# encoded_image = base64.b64encode(open(IMAGE_PATH, 'rb').read()).decode('ascii')
headers = {
    "Content-Type": "application/json",
    "api-key": API_KEY,
}
    
# Payload for the request
payload = {
  "messages": [
    {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": "你是一个帮助用户查找信息的 AI 助手。"
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "hello, 今天旧金山的天气怎么样？"
        }
      ]
    }
  ],
  "temperature": 0.7,
  "top_p": 0.95,
  "max_tokens": 800
}
    
ENDPOINT = "https://qyzhiziopenai.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-02-15-preview"
    
# Send request
try:
    response = requests.post(ENDPOINT, headers=headers, json=payload)
    response.raise_for_status()  # Will raise an HTTPError if the HTTP request returned an unsuccessful status code
except requests.RequestException as e:
    raise SystemExit(f"Failed to make the request. Error: {e}")
    
# Handle the response as needed (e.g., print or process)
print(response.json())