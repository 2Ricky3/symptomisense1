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

  return (
    <div className="p-6 max-w-xl mx-auto mt-12">
      <button
        type="button"
        className="absolute top-6 left-6 text-sm text-muted hover:text-accent hover:underline transition bg-transparent border-none cursor-pointer z-50"
        onClick={onHomeClick}
      >
        ← Back to Home
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center" data-aos="fade-down">
        AI Test Page
      </h1>

      <div data-aos="fade-up">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me something..."
          className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={5}
        />
      </div>

      <div data-aos="fade-up" data-aos-delay="100">
        <button
          onClick={handleAsk}
          disabled={loading}
          className="mt-4 w-full px-5 py-3 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </div>

      {response && (
        <div className="mt-6 p-4 border rounded bg-gray-50" data-aos="fade-in" data-aos-delay="200">
          <strong>Response:</strong>
          <p className="mt-2 whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
};

export default AiTestPage;
