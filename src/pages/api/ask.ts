import { gpt } from "@/services/chatgpt";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const answer = await gpt.sendMessage(req.query.q as string);

  res.status(200).json({ answer: answer.text });
}
