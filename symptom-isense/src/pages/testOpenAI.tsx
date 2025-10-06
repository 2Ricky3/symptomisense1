import React, { useState } from "react";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface AiTestPageProps {
  onHomeClick?: () => void;
}

const AiTestPage: React.FC<AiTestPageProps> = ({ onHomeClick }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    console.log("Sending input to OpenAI:", input);
    console.log("API Key:", import.meta.env.VITE_OPENAI_API_KEY);

    try {
      const res = await client.responses.create({
        model: "gpt-4o-mini",
        input,
      });

      console.log("Full API response:", res);

      interface OutputItem {
        type: string;
        text?: string;
      }

      const textOutputs = Array.isArray(res.output)
        ? res.output
            .filter(
              (item: OutputItem) =>
                item.type === "output_text" && typeof item.text === "string"
            )
            .map((item: OutputItem) => item.text as string)
            .join("\n")
        : "";

      console.log("Extracted text output:", textOutputs);

      setResponse(textOutputs || "⚠️ No text output received.");
    } catch (err: unknown) {
      console.error("Error calling OpenAI API:", err);

      if (
        typeof err === "object" &&
        err !== null &&
        "status" in err &&
        typeof (err as { status?: number }).status === "number"
      ) {
        const status = (err as { status: number }).status;
        if (status === 429) {
          setResponse(
            "⚠️ Rate limit exceeded. Please wait a moment or check your quota."
          );
        } else if (status === 401) {
          setResponse(
            "⚠️ Unauthorized. Check your API key or environment variable."
          );
        } else {
          setResponse(
            `⚠️ Something went wrong: ${(err as { message?: string }).message || "Check console for details."}`
          );
        }
      } else {
        setResponse(
          `⚠️ Something went wrong: ${(err as { message?: string }).message || "Check console for details."}`
        );
      }
    } finally {
      setLoading(false);
    }
  };
  const textButtonClass =
    "text-accent hover:text-bg hover:bg-accent/20 hover:scale-105 transition-all duration-200 rounded px-2 py-1 cursor-pointer";

  const mainButtonClass =
    "w-full rounded-md px-5 py-3 text-base font-semibold text-dark bg-bg border border-muted/30 shadow-md " +
    "transition-all duration-300 transform hover:bg-dark hover:text-bg hover:shadow-lg hover:scale-105 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-bg via-bg to-muted flex flex-col items-center justify-start overflow-y-auto p-6 lg:p-8">
      <button
        type="button"
        className={`${textButtonClass} absolute top-6 left-6 z-50`}
        onClick={onHomeClick}
      >
        ← Back to Home
      </button>
      <div className="mt-20 w-full max-w-2xl bg-bg/80 backdrop-blur-lg rounded-lg shadow-xl border border-muted/20 p-8">
        <h1
          className="text-4xl font-extrabold text-dark text-center mb-6 drop-shadow-sm"
          data-aos="fade-down"
        >
         Check your symptoms with AI
        </h1>
        <div data-aos="fade-up">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me something..."
            className="w-full border border-muted/30 bg-bg rounded-md p-4 text-dark text-base focus:outline-none focus:ring-2 focus:ring-accent/40 transition duration-200"
            rows={5}
          />
        </div>
        <div data-aos="fade-up" data-aos-delay="100">
          <button
            onClick={handleAsk}
            disabled={loading}
            className={`mt-6 ${mainButtonClass}`}
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>
        </div>
        {response && (
          <div
            className="mt-6 p-4 border border-muted/30 rounded-md bg-bg/60 backdrop-blur-sm text-dark shadow-inner"
            data-aos="fade-in"
            data-aos-delay="200"
          >
            <strong className="block text-accent mb-2">Response:</strong>
            <p className="whitespace-pre-wrap text-muted text-base">{response}</p>
          </div>
        )}
      </div>

      {/* Tip / Footer */}
      <div className="mt-6 text-xs text-muted text-center">
        Tip: Describe your symptoms in detail for better results.
      </div>
    </div>
  );
};

export default AiTestPage;
