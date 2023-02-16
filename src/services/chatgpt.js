import { ChatGPTAPI } from "chatgpt";

export const gpt = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
});
