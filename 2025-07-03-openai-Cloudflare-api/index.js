import OpenAI from "openai";

import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.CLOUDFLARE_API_KEY;
if (!apiKey) {
  throw new Error("CLOUDFLARE_API_KEY is not set in the environment variables.");
}
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
if (!CLOUDFLARE_ACCOUNT_ID) {
  throw new Error("CLOUDFLARE_ACCOUNT_ID is not set in the environment variables.");
}

const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/v1`
 });

const chatCompletion = await openai.chat.completions.create({
  messages: [{ role: "user", content: "hello" }],
  model: "@cf/meta/llama-3.1-8b-instruct",
 });
 console.log(chatCompletion.choices[0].message.content);

const embeddings = await openai.embeddings.create({
    model: "@cf/baai/bge-large-en-v1.5",
    input: "I love matcha"
  });
console.log(embeddings.data[0]);