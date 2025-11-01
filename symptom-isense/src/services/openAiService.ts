import OpenAI from "openai";
import { systemPrompt, getUserPrompt } from "../utils/openAiPrompts";
import type { OpenAIResponse } from "../types/symptomChecker";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export interface AnalysisResult {
  response: string;
  soapNote: string;
}

export const analyzeSymptoms = async (input: string): Promise<AnalysisResult> => {
  const res = await client.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: getUserPrompt(input),
      },
    ],
  });

  const safeRes = res as OpenAIResponse;

  const fullText =
    safeRes.output_text?.trim() ||
    safeRes.output?.[0]?.content?.[0]?.text ||
    "";

  const [plainAnswer, soapPart] = fullText.split(/SOAP\s*Note:/i);

  const finalResponse =
    (plainAnswer?.trim() || fullText) +
    "\n\nReminder: I am not a real doctor. Please consult a healthcare professional for any medical concerns.";

  const soapNote = soapPart ? "SOAP Note:\n" + soapPart.trim() : "";

  return {
    response: finalResponse,
    soapNote,
  };
};
