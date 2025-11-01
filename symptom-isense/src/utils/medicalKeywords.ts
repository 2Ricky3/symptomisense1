export const medicalKeywords = [
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

export const additionalMedicalTerms = ['feel', 'hurt', 'doctor', 'medical', 'health', 'treatment'];

export const isMedicalQuery = (input: string): boolean => {
  const inputLower = input.toLowerCase();
  
  return medicalKeywords.some(keyword => inputLower.includes(keyword)) ||
         additionalMedicalTerms.some(term => inputLower.includes(term));
};
