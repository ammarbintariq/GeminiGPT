import { GoogleGenAI } from "@google/genai";

const MODELS = ["gemini-3.5-flash-lite", "gemini-3.8-flash"];

const isUnavailableError = (error) =>
  Number(error?.status ?? error?.code) === 503 ||
  /503|UNAVAILABLE/i.test(String(error?.message ?? error));

async function main(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Gemini API key is missing. Add VITE_GEMINI_API_KEY to Gumini/.env and restart the dev server.",
    );
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      timeout: 460_000,
      retryOptions: { attempts: 2 },
    },
  });

  let response;
  for (let index = 0; index < MODELS.length; index += 1) {
    try {
      response = await ai.models.generateContent({
        model: MODELS[index],
        contents: prompt,
      });
      break;
    } catch (requestError) {
      if (isUnavailableError(requestError) && index < MODELS.length - 1) {
        continue;
      }
      if (/504|DEADLINE_EXCEEDED/i.test(String(requestError?.message ?? requestError))) {
        throw new Error(
          "Gemini took too long to respond (504). Please try again in a moment.",
          { cause: requestError },
        );
      }
      if (isUnavailableError(requestError)) {
        throw new Error(
          "Gemini is temporarily unavailable (503). Please try again in a moment.",
          { cause: requestError },
        );
      }
      throw requestError;
    }
  }

  const text = response.text?.trim();
  if (!text) {
    throw new Error("Gemini returned an empty response. Please try again.");
  }

  return text;
}

export default main;
