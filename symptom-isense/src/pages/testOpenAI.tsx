import React, { useState } from "react";
import { savePrompt, auth } from "../services/firebase";
import { analyzeSymptoms } from "../services/openAiService";
import { generateMedicalReportPDF } from "../services/pdfService";
import { isMedicalQuery } from "../utils/medicalKeywords";
import { FaUserMd, FaTrash, FaShare } from "react-icons/fa";
import { recommendations, extraRecommendations } from "../utils/constants";
import Button from "../components/ui/Button";
import BackButton from "../components/ui/BackButton";
import FormTextarea from "../components/forms/FormTextarea";
import FormLabel from "../components/forms/FormLabel";
import IconButton from "../components/ui/IconButton";
import RecommendationChip from "../components/ui/RecommendationChip";
import AIResponseDisplay from "../components/ui/AIResponseDisplay";
import DownloadReportButton from "../components/ui/DownloadReportButton";
import LoadingScreen from "../components/ui/LoadingScreen";

const TestOpenAI: React.FC<{ onHomeClick?: () => void }> = ({ onHomeClick }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [soapNote, setSoapNote] = useState("");
  const [submittedInput, setSubmittedInput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isInvalidInput, setIsInvalidInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;

    if (!isMedicalQuery(input)) {
      setIsInvalidInput(true);
      setResponse("❌ I can only help with medical symptoms and health-related questions. Please describe your symptoms or health concerns, and I'll do my best to provide helpful information.");
      setLoading(false);
      return;
    }

    setIsInvalidInput(false);
    setSubmittedInput(input.trim());
    setIsEditing(false);
    setLoading(true);
    setResponse("");
    setSoapNote("");

    try {
      const result = await analyzeSymptoms(input);
      setResponse(result.response);
      setSoapNote(result.soapNote);

      const userId = auth.currentUser?.uid;
      if (userId) {
        await savePrompt(userId, input.trim(), result.response, result.soapNote);
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
    if (submittedInput) {
      setInput(submittedInput);
      setIsEditing(true);
    }
    setSubmittedInput(null);
    setResponse("");
    setSoapNote("");
    setIsInvalidInput(false);
  };

  const handleClearAll = () => {
    setSubmittedInput(null);
    setResponse("");
    setSoapNote("");
    setInput("");
    setIsInvalidInput(false);
    setIsEditing(false);
  };

  const handleDownloadSOAP = async () => {
    if (!soapNote) return;

    try {
      await generateMedicalReportPDF(soapNote);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  };

  if (loading) {
    return (
      <LoadingScreen 
        message="AI is analyzing your symptoms..." 
        submessage="This may take a few moments"
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-bg via-bg to-muted flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl flex-grow bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col" data-aos="fade-up">
        <div className="flex items-center justify-between mb-6">
          <BackButton
            onClick={() => {
              if (onHomeClick) onHomeClick();
              else window.location.href = '/';
            }}
            className="-ml-2"
            data-aos="fade-right"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-dark text-center" data-aos="fade-down" data-aos-delay="100">
            Symptom Checker
          </h1>
          <div className="w-24"></div> 
        </div>

        {!submittedInput ? (
          <div className="flex-grow flex flex-col items-center justify-center">
            {!response && (
              <div className="bg-black shadow-md rounded-lg p-4 mb-6 flex items-center gap-4 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer w-full max-w-3xl" data-aos="fade-up" data-aos-delay="200">
                <div className="text-white text-4xl">
                  <FaUserMd />
                </div>
                <p className="text-sm text-white">
                  Please describe your symptoms in as much detail as possible. Include information such as temperature, duration, and any other relevant details to help us provide better insights.
                </p>
              </div>
            )}
            <FormLabel className="text-left w-full max-w-3xl" data-aos="fade-up" data-aos-delay="300">
              Describe your symptoms:
              {isEditing && (
                <span className="ml-2 text-sm font-normal text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  ✏️ Editing previous input
                </span>
              )}
            </FormLabel>
            <FormTextarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (isInvalidInput) setIsInvalidInput(false);
              }}
              placeholder="For example: 'I have a persistent dry cough, a slight fever of 38°C, and feel very tired for the last 3 days...'"
              className={`max-w-3xl mb-4 h-40 ${
                isInvalidInput 
                  ? 'border-red-500 border-2 bg-red-50' 
                  : isEditing 
                    ? 'border-blue-500 border-2 bg-blue-50' 
                    : ''
              }`}
              data-aos="fade-up"
              data-aos-delay="350"
            />
            {isInvalidInput && (
              <p className="text-red-600 text-sm mb-3 max-w-3xl text-center" data-aos="shake">
                ⚠️ Please enter medical symptoms or health-related questions only
              </p>
            )}
            <h3 className="text-base sm:text-lg font-medium text-dark mb-3 text-center" data-aos="fade-up" data-aos-delay="400">Some recommendations to get you started</h3>
            <div className="w-full max-w-4xl mb-4" data-aos="fade-up" data-aos-delay="450">
              <div className="flex flex-wrap gap-2 justify-center">
                {recommendations.map((rec, idx) => (
                  <RecommendationChip
                    key={idx}
                    recommendation={rec}
                    isSelected={input === rec}
                    onClick={() => setInput(rec)}
                  />
                ))}

                <div 
                  className={`w-full flex flex-wrap gap-2 justify-center transition-all duration-500 ease-in-out origin-top overflow-hidden ${
                    showMore 
                      ? 'max-h-[1000px] opacity-100 scale-y-100' 
                      : 'max-h-0 opacity-0 scale-y-95 pointer-events-none'
                  }`}
                >
                  {extraRecommendations.map((rec, idx) => (
                    <RecommendationChip
                      key={`extra-${idx}`}
                      recommendation={rec}
                      isSelected={input === rec}
                      onClick={() => setInput(rec)}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setShowMore(!showMore)}
                  className="px-3 sm:px-4 py-2 rounded-full shadow transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg bg-white text-black border border-muted/30 flex items-center gap-2 text-sm sm:text-base mt-2"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  {showMore ? (
                    <>
                      <span className="hidden xs:inline">Show Less</span>
                      <span className="xs:hidden">Less</span>
                      <span className={`text-lg transition-transform duration-300 inline-block ${showMore ? 'rotate-0' : 'rotate-180'}`}>▲</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden xs:inline">Show More Options</span>
                      <span className="xs:hidden">More</span>
                      <span className={`text-lg transition-transform duration-300 inline-block ${showMore ? 'rotate-180' : 'rotate-0'}`}>▼</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-3" data-aos="fade-up" data-aos-delay="550">
              <Button 
                onClick={handleAsk} 
                disabled={loading}
                loading={loading}
                className="flex-1 w-full"
              >
                Get Analysis
              </Button>
              <IconButton
                onClick={handleClearAll}
                aria-label="Clear input"
                title="Clear input"
                icon={<FaTrash />}
                variant="danger"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center gap-6 md:gap-8 min-h-0 w-full">
            <div className="flex flex-col w-full max-w-3xl">
              <label className="text-dark font-medium mb-2 block text-left" data-aos="fade-right">Your input</label>
              <div className="w-full p-4 border border-muted/30 rounded-md bg-bg/60 text-dark whitespace-pre-wrap mb-4" data-aos="fade-up" data-aos-delay="100">
                {submittedInput}
              </div>
              <div className="w-full flex flex-col sm:flex-row flex-wrap gap-3 mb-6" data-aos="fade-up" data-aos-delay="150">
                <Button 
                  onClick={handleReset} 
                  disabled={loading}
                  variant="edit"
                  className="flex-1 min-w-[200px]"
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
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-2"
                >
                  <FaShare className="w-4 h-4" />
                  Share
                </Button>
                <Button 
                  onClick={() => {
                    if (onHomeClick) onHomeClick();
                    else window.location.href = '/';
                  }}
                  disabled={loading}
                  variant="danger"
                  className="flex-1 min-w-[200px]"
                >
                  Close
                </Button>
              </div>
              
              <div className="w-full bg-bg/40 p-4 rounded-md border border-muted/20 mb-6" data-aos="fade-up" data-aos-delay="200">
                <h2 className="text-lg font-semibold text-dark mb-2">AI Analysis</h2>
                <div className="text-muted whitespace-pre-wrap">
                  <AIResponseDisplay response={response} />
                </div>
                <DownloadReportButton onClick={handleDownloadSOAP} hasReport={!!soapNote} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestOpenAI;
