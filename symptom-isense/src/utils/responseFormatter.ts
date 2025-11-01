import type { ResponseSection } from '../types/symptomChecker';

export const removeMarkdownFormatting = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/###\s*(.*?)(?=\n|$)/g, '$1')
    .replace(/##\s*(.*?)(?=\n|$)/g, '$1')
    .replace(/#\s*(.*?)(?=\n|$)/g, '$1');
};

const isLikelyHeader = (line: string): boolean => {
  return line.length < 60 && (line.endsWith(':') || /^[\d.]+\s*/.test(line));
};

const shouldStartNewSection = (
  lowerLine: string,
  line: string,
  currentTitle: string
): { shouldStart: boolean; newTitle: string } => {
  if (!isLikelyHeader(line)) {
    return { shouldStart: false, newTitle: '' };
  }

  if (
    (lowerLine.includes('possible causes') || 
     lowerLine.includes('likely causes') || 
     lowerLine.includes('potential causes')) && 
    currentTitle !== '🔍 Possible Causes'
  ) {
    return { shouldStart: true, newTitle: '🔍 Possible Causes' };
  }

  if (
    (lowerLine.includes('self-care') || 
     (lowerLine.includes('recommendations') && !lowerLine.includes('following')) ||
     (lowerLine.includes('treatment') && line.length < 50)) && 
    currentTitle !== '🩹 Self-Care Recommendations'
  ) {
    return { shouldStart: true, newTitle: '🩹 Self-Care Recommendations' };
  }

  if (
    (lowerLine.includes('see a doctor') || 
     lowerLine.includes('seek medical') || 
     lowerLine.includes('medical attention') || 
     lowerLine.includes('medical care')) && 
    currentTitle !== '🚨 When to Seek Medical Care'
  ) {
    return { shouldStart: true, newTitle: '🚨 When to Seek Medical Care' };
  }

  if (
    lowerLine.includes('reminder') && 
    lowerLine.includes('doctor') && 
    currentTitle !== '💡 Important Reminder'
  ) {
    return { shouldStart: true, newTitle: '💡 Important Reminder' };
  }

  return { shouldStart: false, newTitle: '' };
};

export const parseResponseIntoSections = (text: string): ResponseSection[] => {
  const formattedText = removeMarkdownFormatting(text);
  const sections: ResponseSection[] = [];
  const lines = formattedText.split('\n');
  let currentSection: ResponseSection = { title: '', content: [] };

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      if (currentSection.content.length > 0) {
        currentSection.content.push('');
      }
      continue;
    }

    const lowerLine = trimmedLine.toLowerCase();
    const { shouldStart, newTitle } = shouldStartNewSection(
      lowerLine,
      trimmedLine,
      currentSection.title
    );

    if (shouldStart) {
      if (currentSection.title) {
        sections.push(currentSection);
      }
      currentSection = { title: newTitle, content: [] };
      
      if (newTitle === '💡 Important Reminder') {
        currentSection.content.push(trimmedLine);
      }
      continue;
    }

    if (!currentSection.title) {
      currentSection.title = '📋 Analysis';
    }
    currentSection.content.push(trimmedLine);
  }

  if (currentSection.title) {
    sections.push(currentSection);
  }

  return sections;
};

export const highlightImportantTerms = (text: string): string => {
  const importantTerms = [
    'immediately', 'urgent', 'emergency', 'severe', 
    'serious', 'warning', 'danger', 'critical'
  ];

  let processedText = text;
  importantTerms.forEach(term => {
    const regex = new RegExp(`\\b(${term})\\b`, 'gi');
    processedText = processedText.replace(
      regex, 
      `<strong class="text-red-600">$1</strong>`
    );
  });

  return processedText;
};
