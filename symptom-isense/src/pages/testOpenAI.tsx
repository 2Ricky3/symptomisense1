import React, { useState } from "react";
import OpenAI from "openai";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { savePrompt, auth } from "../services/firebase";
import { FaUserMd, FaTrash } from "react-icons/fa";
import { recommendations, extraRecommendations } from "../utils/constants";
import Button from "../components/ui/Button";
import BackButton from "../components/ui/BackButton";
import FormTextarea from "../components/forms/FormTextarea";
import FormLabel from "../components/forms/FormLabel";
import IconButton from "../components/ui/IconButton";
import RecommendationChip from "../components/ui/RecommendationChip";
import Loader from "./Loader";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const TestOpenAI: React.FC<{ onHomeClick?: () => void }> = ({ onHomeClick }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [soapNote, setSoapNote] = useState("");
  const [submittedInput, setSubmittedInput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isInvalidInput, setIsInvalidInput] = useState(false);

  const formatResponse = (text: string) => {
    if (!text) return text;
    
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/###\s*(.*?)(?=\n|$)/g, '$1')
      .replace(/##\s*(.*?)(?=\n|$)/g, '$1')
      .replace(/#\s*(.*?)(?=\n|$)/g, '$1');
    
    const lines = formattedText.split('\n');
    return lines.map((line, index) => {
      if (!line.trim()) return <br key={index} />;
      
      const boldTerms = ['immediately', 'urgent', 'emergency', 'severe', 'serious', 'warning', 'danger', 'critical'];
      let processedLine = line;
      
      boldTerms.forEach(term => {
        const regex = new RegExp(`\\b(${term})\\b`, 'gi');
        processedLine = processedLine.replace(regex, `<strong>$1</strong>`);
      });
      
      return (
        <span key={index} dangerouslySetInnerHTML={{ __html: processedLine }} />
      );
    });
  };

  const handleAsk = async () => {
    if (!input.trim()) return;

    const medicalKeywords = [
      'symptom', 'pain', 'ache', 'fever', 'cough', 'headache', 'nausea', 'vomit', 'dizzy', 'tired', 'fatigue',
      'sore', 'hurt', 'sick', 'illness', 'infection', 'rash', 'swelling', 'bleeding', 'shortness', 'breath',
      'chest', 'stomach', 'abdomen', 'back', 'leg', 'arm', 'throat', 'ear', 'eye', 'nose', 'mouth',
      'temperature', 'cold', 'flu', 'allergy', 'itchy', 'burning', 'tingling', 'numbness', 'weakness',
      'cramp', 'spasm', 'stiff', 'joint', 'muscle', 'bone', 'skin', 'bump', 'lump', 'bruise',
      'discharge', 'runny', 'stuffy', 'congestion', 'sneeze', 'wheeze', 'difficulty', 'trouble',
      'irregular', 'fast', 'slow', 'heart', 'pulse', 'pressure', 'blood', 'urine', 'bowel',
      'diarrhea', 'constipation', 'appetite', 'weight', 'sleep', 'insomnia', 'anxiety', 'stress',
      'depression', 'mood', 'memory', 'concentration', 'vision', 'hearing', 'balance', 'coordination'
    ];

    const inputLower = input.toLowerCase();
    const isMedicalQuery = medicalKeywords.some(keyword => inputLower.includes(keyword)) ||
                          inputLower.includes('feel') || inputLower.includes('hurt') || 
                          inputLower.includes('doctor') || inputLower.includes('medical') ||
                          inputLower.includes('health') || inputLower.includes('treatment');

    if (!isMedicalQuery) {
      setIsInvalidInput(true);
      setResponse("❌ I can only help with medical symptoms and health-related questions. Please describe your symptoms or health concerns, and I'll do my best to provide helpful information.");
      setLoading(false);
      return;
    }

    setIsInvalidInput(false);

    setSubmittedInput(input.trim());
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
              "You are a compassionate medical assistant designed to help people understand their symptoms. You are not a real doctor, but you should be helpful within your limitations. " +
              "Your goals are to: " +
              "1. Provide clear, concise explanations of possible causes " +
              "2. Suggest practical self-care measures when appropriate " +
              "3. Recommend when to seek medical attention " +
              "4. Offer reassurance while remaining medically responsible " +
              "Guidelines: " +
              "- Keep responses under 200 words for the main explanation " +
              "- Write in plain text without any markdown formatting like *, **, ###, or other symbols " +
              "- Use simple, empathetic language with appropriate emojis to make responses friendly " +
              "- Provide 2-3 most likely explanations " +
              "- Include specific, actionable self-care tips " +
              "- Clearly state red flags requiring immediate care " +
              "- Be supportive but concise " +
              "- Organize information in short, clear paragraphs " +
              "- Use emojis sparingly but appropriately (🩺💊🌡️❤️🔴⚠️) " +
              "- Never use asterisks (*), hashtags (#), or other markdown symbols " +
              "- Write naturally as if speaking to someone, not as formatted text " +
              "- Always end with encouragement to seek professional care for proper diagnosis ",
          },
          {
            role: "user",
            content:
              input +
              "\n\nPlease provide a concise response (under 200 words) that includes: " +
              "1. Most likely explanations for these symptoms " +
              "2. Practical self-care recommendations " +
              "3. When to see a doctor immediately " +
              "After your response, generate a comprehensive SOAP note for healthcare providers. " +
              "Label it clearly as 'SOAP Note:' and make it detailed and medically precise. " +
              "For the SOAP note, use this structure:" +
              "\nSubjective: Include all patient-reported symptoms, duration, severity, and relevant history from the user's input. Add 'Patient reports:' before symptoms." +
              "\nObjective: Note that this is patient-provided information only. Include any measurements mentioned (temperature, etc.). State 'Physical examination and vital signs to be obtained by healthcare provider.'" +
              "\nAssessment: List differential diagnoses based on symptoms. Use medical terminology. Include 2-3 most likely conditions." +
              "\nPlan: Recommend specific diagnostic tests, examinations, treatments, and follow-up care. Include both immediate actions and monitoring recommendations.",
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

      const finalResponse =
        (plainAnswer?.trim() || fullText) +
        "\n\nReminder: I am not a real doctor. Please consult a healthcare professional for any medical concerns.";

      setResponse(finalResponse);

      if (soapPart) setSoapNote("SOAP Note:\n" + soapPart.trim());

      const userId = auth.currentUser?.uid;
      if (userId) {
        await savePrompt(userId, input.trim(), finalResponse);
      }
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

  const handleReset = () => {
    setSubmittedInput(null);
    setResponse("");
    setSoapNote("");
    setInput("");
    setIsInvalidInput(false);
  };

  const handleDownloadSOAP = async () => {
    if (!soapNote) return;
  
    try {
      const pdfDoc = await PDFDocument.create();
      let page = pdfDoc.addPage([595, 842]);
      const { width, height } = page.getSize();
      const margin = 50;
      const lineHeight = 16;
      const maxLineWidth = width - 2 * margin;
      const minBottomMargin = 80;
    
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
      let yPosition = height - margin;
    
      const checkNewPage = (requiredSpace: number) => {
        if (yPosition - requiredSpace < minBottomMargin) {
          page = pdfDoc.addPage([595, 842]);
          yPosition = height - margin;
          return true;
        }
        return false;
      };

      const addWrappedText = (text: string, fontSize: number, isBold: boolean = false, leftIndent: number = 0) => {
        if (!text.trim()) return;
        
        const currentFont = isBold ? boldFont : font;
        const words = text.trim().split(/\s+/);
        const availableWidth = maxLineWidth - leftIndent;
        let currentLine = '';
        
        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const textWidth = currentFont.widthOfTextAtSize(testLine, fontSize);
          
          if (textWidth <= availableWidth) {
            currentLine = testLine;
          } else {
            if (currentLine) {
              checkNewPage(lineHeight + 5);
              page.drawText(currentLine, {
                x: margin + leftIndent,
                y: yPosition,
                size: fontSize,
                font: currentFont,
                color: rgb(0.15, 0.15, 0.15),
              });
              yPosition -= lineHeight;
            }
            
            if (currentFont.widthOfTextAtSize(word, fontSize) > availableWidth) {
              let remainingWord = word;
              while (remainingWord.length > 0) {
                let charCount = remainingWord.length;
                while (charCount > 0 && currentFont.widthOfTextAtSize(remainingWord.substring(0, charCount), fontSize) > availableWidth) {
                  charCount--;
                }
                if (charCount === 0) charCount = 1;
                
                checkNewPage(lineHeight + 5);
                page.drawText(remainingWord.substring(0, charCount), {
                  x: margin + leftIndent,
                  y: yPosition,
                  size: fontSize,
                  font: currentFont,
                  color: rgb(0.15, 0.15, 0.15),
                });
                yPosition -= lineHeight;
                remainingWord = remainingWord.substring(charCount);
              }
              currentLine = '';
            } else {
              currentLine = word;
            }
          }
        }
        
        if (currentLine) {
          checkNewPage(lineHeight + 5);
          page.drawText(currentLine, {
            x: margin + leftIndent,
            y: yPosition,
            size: fontSize,
            font: currentFont,
            color: rgb(0.15, 0.15, 0.15),
          });
          yPosition -= lineHeight;
        }
      };

      const addSectionHeader = (title: string, withDivider: boolean = true) => {
        checkNewPage(40);
        
        if (withDivider && yPosition < height - margin - 20) {
          page.drawLine({
            start: { x: margin, y: yPosition + 5 },
            end: { x: width - margin, y: yPosition + 5 },
            thickness: 0.5,
            color: rgb(0.6, 0.6, 0.6),
          });
          yPosition -= 15;
        }
        
        page.drawText(title, {
          x: margin,
          y: yPosition,
          size: 14,
          font: boldFont,
          color: rgb(0.1, 0.1, 0.1),
        });
        yPosition -= 25;
      };
    
      checkNewPage(100);
      
      page.drawRectangle({
        x: 0,
        y: yPosition - 10,
        width: width,
        height: 60,
        color: rgb(0.05, 0.25, 0.45),
      });
      
      page.drawText("SYMPTOM-iSENSE MEDICAL REPORT", {
        x: margin,
        y: yPosition,
        size: 18,
        font: boldFont,
        color: rgb(1, 1, 1),
      });
      
      page.drawText("Patient-Provided Information for Healthcare Review", {
        x: margin,
        y: yPosition - 20,
        size: 11,
        font: font,
        color: rgb(0.9, 0.9, 0.9),
      });
      
      yPosition -= 80;
      
      checkNewPage(60);
      page.drawRectangle({
        x: margin - 5,
        y: yPosition - 25,
        width: maxLineWidth + 10,
        height: 35,
        color: rgb(0.97, 0.97, 0.97),
        borderColor: rgb(0.8, 0.8, 0.8),
        borderWidth: 1,
      });
      
      page.drawText("Generated: " + new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString(), {
        x: margin,
        y: yPosition - 10,
        size: 10,
        font: boldFont,
        color: rgb(0.4, 0.4, 0.4),
      });
      
      page.drawText("Please review all information with patient during consultation", {
        x: margin,
        y: yPosition - 22,
        size: 9,
        font: font,
        color: rgb(0.5, 0.5, 0.5),
      });
      
      yPosition -= 50;
    
      const content = soapNote.replace(/^SOAP Note:\s*/i, "").trim();
      
      if (!content) {
        addWrappedText("No SOAP note content available.", 12);
        yPosition -= 20;
      } else {
        const sections = content.split(/(?=^(?:Subjective|Objective|Assessment|Plan):\s*)/im);
        
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i].trim();
          if (!section) continue;
          
          const lines = section.split('\n');
          const headerLine = lines[0];
          const contentLines = lines.slice(1);
          
          const headerMatch = headerLine.match(/^(Subjective|Objective|Assessment|Plan):\s*(.*)/i);
          
          if (headerMatch) {
            const sectionName = headerMatch[1];
            const firstLineContent = headerMatch[2];
            
            addSectionHeader(sectionName.toUpperCase(), i > 0);
            
            if (firstLineContent.trim()) {
              addWrappedText(firstLineContent.trim(), 11, false, 10);
              yPosition -= 8;
            }
            
            for (const line of contentLines) {
              if (line.trim()) {
                addWrappedText(line.trim(), 11, false, 10);
                yPosition -= 8;
              } else {
                yPosition -= 8;
              }
            }
            
            yPosition -= 15;
          } else {
            addWrappedText(section, 11);
            yPosition -= 8;
          }
        }
      }
    
      const footerY = 30;
      page.drawLine({
        start: { x: margin, y: footerY + 15 },
        end: { x: width - margin, y: footerY + 15 },
        thickness: 0.5,
        color: rgb(0.7, 0.7, 0.7),
      });
      
      page.drawText("This document contains patient-reported symptoms and AI-generated analysis.", {
        x: margin,
        y: footerY,
        size: 8,
        font: font,
        color: rgb(0.5, 0.5, 0.5),
      });
      
      page.drawText("Not a substitute for professional medical examination and diagnosis.", {
        x: width - margin - 220,
        y: footerY,
        size: 8,
        font: font,
        color: rgb(0.5, 0.5, 0.5),
      });
    
      const pdfBytes = await pdfDoc.save();
      const arrayBuffer = pdfBytes.buffer as ArrayBuffer;
      const blob = new Blob([arrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Detailed_Medical_Report.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-bg via-bg to-muted flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <Loader />
          <p className="mt-4 text-muted">AI is analyzing your symptoms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-bg via-bg to-muted flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl flex-grow bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <BackButton
            onClick={() => {
              if (onHomeClick) onHomeClick();
              else window.location.href = '/';
            }}
            className="-ml-2"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-dark text-center">
            Symptom Checker
          </h1>
          <div className="w-24"></div> 
        </div>
        {!submittedInput ? (
          <div className="flex-grow flex flex-col items-center justify-center">
            {!response && (
              <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex items-center gap-4 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer w-full max-w-3xl">
                <div className="text-primary text-4xl">
                  <FaUserMd />
                </div>
                <p className="text-sm text-muted">
                  Please describe your symptoms in as much detail as possible. Include information such as temperature, duration, and any other relevant details to help us provide better insights.
                </p>
              </div>
            )}
            <FormLabel className="text-left w-full max-w-3xl">Describe your symptoms:</FormLabel>
            <FormTextarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (isInvalidInput) setIsInvalidInput(false);
              }}
              placeholder="For example: 'I have a persistent dry cough, a slight fever of 38°C, and feel very tired for the last 3 days...'"
              className={`max-w-3xl mb-4 h-40 ${isInvalidInput ? 'border-red-500 border-2 bg-red-50' : ''}`}
            />
            {isInvalidInput && (
              <p className="text-red-600 text-sm mb-3 max-w-3xl text-center">
                ⚠️ Please enter medical symptoms or health-related questions only
              </p>
            )}
            <h3 className="text-lg font-medium text-dark mb-3 text-center">Some recommendations to get you started</h3>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {recommendations.map((rec, idx) => (
                <RecommendationChip
                  key={idx}
                  recommendation={rec}
                  isSelected={input === rec}
                  onClick={() => setInput(rec)}
                />
              ))}

              {showMore &&
                extraRecommendations.map((rec, idx) => (
                  <RecommendationChip
                    key={`extra-${idx}`}
                    recommendation={rec}
                    isSelected={input === rec}
                    onClick={() => setInput(rec)}
                  />
                ))}

              <button
                onClick={() => setShowMore(!showMore)}
                className="px-4 py-2 rounded-full shadow transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg bg-white text-black border border-muted/30 flex items-center gap-2"
              >
                {showMore ? (
                  <>
                    Show Less <span className="text-lg">▲</span>
                  </>
                ) : (
                  <>
                    Show More Options <span className="text-lg">▼</span>
                  </>
                )}
              </button>
            </div>
            <div className="w-full max-w-3xl flex gap-3">
              <Button 
                onClick={handleAsk} 
                disabled={loading}
                loading={loading}
              >
                Get Analysis
              </Button>
              <IconButton
                onClick={() => { setInput(''); }}
                aria-label="Clear input"
                title="Clear input"
                icon={<FaTrash />}
                variant="danger"
              />
            </div>
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center gap-6 md:gap-8 min-h-0">
            <div className="flex flex-col w-full max-w-3xl">
              <label className="text-dark font-medium mb-2 block text-left">Your input</label>
              <div className="w-full p-4 border border-muted/30 rounded-md bg-bg/60 text-dark whitespace-pre-wrap mb-4">
                {submittedInput}
              </div>
              <div className="w-full bg-bg/40 p-4 rounded-md border border-muted/20 mb-4">
                <h2 className="text-lg font-semibold text-dark mb-2">AI Analysis</h2>
                <div className="text-muted whitespace-pre-wrap">
                  {response ? formatResponse(response) : "— Your analysis will appear here —"}
                </div>
                {soapNote && (
                  <div className="mt-6 text-center border-t border-muted/20 pt-4">
                    <p className="text-sm text-dark mb-2">A summary for your doctor is ready.</p>
                    <button
                      onClick={handleDownloadSOAP}
                      className="mt-2 px-4 py-2 bg-accent text-bg font-medium rounded-md shadow hover:scale-105 transition-all duration-200"
                    >
                      Download Doctor Report (PDF)
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleReset} 
                  disabled={loading}
                  variant="edit"
                >
                  Edit input
                </Button>
                <Button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Symptom Analysis',
                        text: `Symptoms: ${submittedInput}\n\nAnalysis: ${response}`,
                      });
                    } else {
                      navigator.clipboard.writeText(`Symptoms: ${submittedInput}\n\nAnalysis: ${response}`);
                      alert('Analysis copied to clipboard!');
                    }
                  }}
                  disabled={loading}
                >
                  Share
                </Button>
                <Button 
                  onClick={() => {
                    if (onHomeClick) onHomeClick();
                    else window.location.href = '/';
                  }}
                  disabled={loading}
                  variant="danger"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestOpenAI;
