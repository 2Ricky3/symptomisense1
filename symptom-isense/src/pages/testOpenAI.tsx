import React, { useState } from "react";
import OpenAI from "openai";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

type FontLike = {
  widthOfTextAtSize: (text: string, size: number) => number;
};

import Loader from "./Loader"; 
const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, //  Dev only i should fix later for production
});

const TestOpenAI: React.FC<{ onHomeClick?: () => void }> = ({ onHomeClick }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [soapNote, setSoapNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");
    setSoapNote("");

    try {
      const res = await client.responses.create({
        model: "gpt-4o-mini",
        input: [
          {
            role: "system",
            content:
              "You are a friendly and professional medical assistant. You are not a real doctor. " +
              "Respond in plain, clear sentences that anyone can understand. " +
              "Do not use emojis, symbols, bullet points, or decorative formatting. " +
              "Write in a calm, factual, and respectful tone. " +
              "Keep answers concise but complete. " +
              "Always include a short reminder to consult a real doctor for medical concerns.",
          },
          {
            role: "user",
            content:
              input +
              "\n\nAfter your normal response, generate a structured SOAP note (Subjective, Objective, Assessment, Plan) " +
              "for a doctor to review. Label it clearly as 'SOAP Note:' and make it medically concise.",
          },
        ],
      });

      type OpenAIResponse = {
        output_text?: string;
        output?: Array<{
          content?: Array<{
            text?: string;
          }>;
        }>;
      };

      const safeRes = res as OpenAIResponse;

      const fullText =
        safeRes.output_text?.trim() ||
        safeRes.output?.[0]?.content?.[0]?.text ||
        "";

      const [plainAnswer, soapPart] = fullText.split(/SOAP\s*Note:/i);

      setResponse(
        (plainAnswer?.trim() || fullText) +
          "\n\nReminder: I am not a real doctor. Please consult a healthcare professional for any medical concerns."
      );

      if (soapPart) setSoapNote("SOAP Note:\n" + soapPart.trim());
    } catch (error: unknown) {
      console.error("Error calling OpenAI API:", error);
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "Unknown error";
      setResponse(`⚠️ Something went wrong: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const getWrappedLines = (
    text: string,
    font: FontLike,
    fontSize: number,
    maxWidth: number
  ): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);

      if (width < maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        currentLine = word;
        while (font.widthOfTextAtSize(currentLine, fontSize) > maxWidth) {
          let i = currentLine.length -1;
          while(font.widthOfTextAtSize(currentLine.slice(0, i), fontSize) > maxWidth) {
            i--;
          }
          lines.push(currentLine.slice(0, i));
          currentLine = currentLine.slice(i);
        }
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  };

  const handleDownloadSOAP = async () => {
    if (!soapNote) return;
  
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const { width, height } = page.getSize();
    const margin = 50;
  
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 12;
    const titleFontSize = 18;
    const headerFontSize = 14;
    const textColor = rgb(0, 0, 0);
  
    page.drawText("Symptom-iSense Doctor's Report", {
      x: margin,
      y: height - margin,
      font: helveticaBoldFont,
      size: titleFontSize,
      color: textColor,
    });
  
    page.drawText("Please show this document to your healthcare provider.", {
      x: margin,
      y: height - margin - 20,
      font: helveticaFont,
      size: fontSize,
      color: rgb(0.3, 0.3, 0.3),
    });
  
    let y = height - margin - 60; 
    const content = soapNote.replace("SOAP Note:", "").trim();
    const sections = content.split(/(Subjective:|Objective:|Assessment:|Plan:)/i).filter(Boolean);
  
    let currentPage = page;

    for (let i = 0; i < sections.length; i += 2) {
      const header = sections[i].trim();
      const textContent = (sections[i + 1] || "").trim();
      const textLines = textContent.split('\n');
      
      let requiredHeight = 20; 
      const wrappedContentLines: string[][] = [];

      for (const line of textLines) {
        const wrapped = getWrappedLines(line, helveticaFont, fontSize, width - 2 * margin);
        wrappedContentLines.push(wrapped);
        requiredHeight += wrapped.length * 15;
      }

      if (y - requiredHeight < margin) {
        currentPage = pdfDoc.addPage([595, 842]);
        y = height - margin;
      }

      currentPage.drawText(header, { x: margin, y, font: helveticaBoldFont, size: headerFontSize, color: textColor });
      y -= 20;

      for (const wrappedLines of wrappedContentLines) {
        for (const line of wrappedLines) {
          currentPage.drawText(line, { x: margin, y, font: helveticaFont, size: fontSize, color: textColor });
          y -= 15; 
        }
      }

      y -= 10; 
    }
  
    currentPage.drawText(`Generated on: ${new Date().toLocaleDateString()}`, {
      x: margin,
      y: margin / 2,
      font: helveticaFont,
      size: 8,
      color: rgb(0.5, 0.5, 0.5),
    });
  
  const pdfBytes: Uint8Array = await pdfDoc.save();
  const arrayBuffer = pdfBytes.buffer as ArrayBuffer;
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Doctor_Report.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const smallButtonClasses =
    "text-accent hover:text-bg hover:bg-accent/20 hover:scale-105 transition-all duration-200 rounded px-2 py-1 cursor-pointer";

  const buttonClasses =
    "w-full rounded-md px-5 py-3 text-base font-semibold text-dark bg-bg border border-muted/30 shadow-md " +
    "transition-all duration-300 transform hover:bg-dark hover:text-bg hover:shadow-lg hover:scale-105 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-bg via-bg to-muted flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8">
      {loading && <Loader />}
      <div className="w-full max-w-6xl flex-grow bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            className={`${smallButtonClasses} -ml-2`}
            onClick={() => {
              if (onHomeClick) onHomeClick();
              else window.location.href = '/';
            }}
          >
            ← Back to Home
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark text-center">
            Symptom Checker
          </h1>
          <div className="w-24"></div> 
        </div>
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 min-h-0">
          <div className="flex flex-col h-full">
            <label className="text-dark font-medium mb-2 block text-left">
              Describe your symptoms:
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="For example: 'I have a persistent dry cough, a slight fever of 38°C, and feel very tired for the last 3 days...'"
              className="w-full flex-grow p-3 border border-muted/30 rounded-md text-dark bg-bg/70 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none mb-4"
            />
            <button
              onClick={handleAsk}
              disabled={loading}
              className={buttonClasses}
            >
              {loading ? "Thinking..." : "Get Analysis"}
            </button>
          </div>

          <div className="flex flex-col min-h-[300px] lg:min-h-full bg-bg/40 p-4 rounded-lg border border-muted/20 overflow-y-auto custom-scrollbar">
            <h2 className="text-lg font-semibold text-dark mb-2 sticky top-0 bg-bg/40 py-2">
              AI Analysis
            </h2>
            <p className="text-muted whitespace-pre-wrap flex-grow">
              {response || "— Your analysis will appear here —"}
            </p>
            {soapNote && (
              <div className="mt-6 text-center border-t border-muted/20 pt-4">
                <p className="text-sm text-dark mb-2">
                  A summary for your doctor is ready.
                </p>
                <button
                  onClick={handleDownloadSOAP}
                  className="mt-2 px-4 py-2 bg-accent text-bg font-medium rounded-md shadow hover:scale-105 transition-all duration-200"
                >
                  Download Doctor Report (PDF)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestOpenAI;
