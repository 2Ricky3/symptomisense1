import React, { useState } from "react";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, //For me only to use in dev, not for production
});

const TestOpenAI: React.FC = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      console.log("Sending input to OpenAI:", input);

      const res = await client.responses.create({
        model: "gpt-4o-mini",
        input: [
          {
            role: "system",
            content:
              "You are a friendly medical assistant. You are not a real doctor. " +
              "Give clear, simple, and supportive answers that a normal person can understand. " +
              "Avoid complex medical jargon. Always include a gentle reminder to consult a real doctor for serious concerns.",
          },
          {
            role: "user",
            content: input,
          },
        ],
      });


      console.log("Full API response:", res);

      type OpenAIResponse = {
        output_text?: string;
        output?: Array<{
          content?: Array<{
            text?: string;
          }>;
        }>;
      };

      const safeRes = res as OpenAIResponse;

      const outputText =
        safeRes.output_text?.trim() ||
        safeRes.output?.[0]?.content?.[0]?.text ||
        "";

      console.log("Extracted text output:", outputText);

      setResponse(
        outputText +
          "\n\n⚠️ Reminder: I am not a real doctor. For serious symptoms, please consult a healthcare professional."
      );
    } catch (error) {
      console.error("Error calling OpenAI API:", error);

      type APIError = {
        status?: number;
        message?: string;
      };

      const err = error as APIError;

      if (err.status === 429) {
        setResponse("⚠️ Rate limit exceeded. Please wait or check your quota.");
      } else if (err.status === 401) {
        setResponse("⚠️ Unauthorized. Check your API key or environment variable.");
      } else {
        setResponse(
          `⚠️ Something went wrong: ${err.message || "Check console for details."}`
        );
      }
    } finally {
      setLoading(false);
    }
  };
  const smallButtonClasses =
    "text-accent hover:text-bg hover:bg-accent/20 hover:scale-105 transition-all duration-200 rounded px-2 py-1 cursor-pointer";

  const buttonClasses =
    "w-full rounded-md px-5 py-3 text-base font-semibold text-dark bg-bg border border-muted/30 shadow-md " +
    "transition-all duration-300 transform hover:bg-dark hover:text-bg hover:shadow-lg hover:scale-105 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-bg via-bg to-muted flex flex-col items-center justify-start overflow-y-auto py-12 px-4">

      <button
        type="button"
        className={`${smallButtonClasses} absolute top-6 left-6 z-50`}
        onClick={() => window.location.reload()}
      >
        ← Back to Home
      </button>


      <div className="w-full max-w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center mb-16">
        <h1 className="text-3xl font-bold text-dark mb-6">
          AI Test Chat
        </h1>

        <div className="mb-4 text-left max-h-[40vh] overflow-y-auto custom-scrollbar">
          <h2 className="text-base font-semibold text-dark mb-2">Response:</h2>
          <p className="text-muted whitespace-pre-wrap bg-bg/40 p-3 rounded-md border border-muted/20">
            {response || "— Awaiting your input —"}
          </p>
        </div>

        <label className="text-dark font-medium mb-2 block text-left">
          Describe your symptoms:
        </label>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here..."
          className="w-full h-32 p-3 border border-muted/30 rounded-md text-dark bg-bg/70 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none mb-4"
        />

        <button
          onClick={handleAsk}
          disabled={loading}
          className={buttonClasses}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </div>
    </div>
  );
};

export default TestOpenAI;
