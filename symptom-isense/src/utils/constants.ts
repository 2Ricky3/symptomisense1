
export const firebaseErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': 'This email is already registered. Try logging in.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/user-disabled': 'This account has been disabled. Contact support if you think this is a mistake.',
  'auth/operation-not-allowed': 'This authentication method is not enabled.',
  'auth/requires-recent-login': 'Please re-authenticate and try again.',
};

export const buttonStyles = {
  primary: "w-full rounded-md px-5 py-3 text-base font-semibold text-dark bg-bg border border-muted/30 shadow-md " +
    "transition-all duration-300 transform hover:bg-dark hover:text-bg hover:shadow-lg hover:scale-105 " +
    "disabled:opacity-50 disabled:cursor-not-allowed",
  
  secondary: "text-accent hover:text-bg hover:bg-accent/20 hover:scale-105 transition-all duration-200 rounded px-2 py-1 cursor-pointer",
  
  small: "text-accent hover:text-bg hover:bg-accent/20 hover:scale-105 transition-all duration-200 rounded px-2 py-1 cursor-pointer text-sm hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4",
  
  edit: "rounded-md px-4 py-2 text-sm font-medium text-dark bg-bg border border-muted/30 shadow-md " +
    "transition-all duration-300 transform hover:bg-dark hover:text-bg hover:shadow-lg hover:scale-105 " +
    "disabled:opacity-50 disabled:cursor-not-allowed text-sm",
  
  social: "w-full rounded-md px-5 py-3 text-base font-semibold text-dark bg-white border border-muted/30 shadow-md flex items-center justify-center gap-2 transition-all duration-300 transform hover:bg-gray-100 hover:shadow-lg hover:scale-105",
  
  danger: "px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition-all duration-200",

  checkSymptoms: "rounded-md px-6 py-3 text-base font-semibold text-[var(--color-bg)] bg-[var(--color-dark)] border border-[var(--color-dark)] shadow-md transition-all duration-300 transform hover:bg-[var(--color-accent)] hover:shadow-lg hover:scale-105"
};

export const features = [
  {
    title: "AI Symptom Checker",
    description: "Get instant insights on your symptoms using advanced AI."
  },
  {
    title: "Privacy First",
    description: "Your health data is never stored or shared."
  },
  {
    title: "Easy to Use",
    description: "Simple, conversational interface for everyone."
  },
  {
    title: "Personalized Results",
    description: "Tailored suggestions based on your unique symptoms."
  }
];

export const faqs = [
  {
    question: "Is my data private?",
    answer: "Yes. We do not store or share any personal health information."
  },
  {
    question: "How accurate are the results?",
    answer: "Our AI uses up-to-date medical information, but always consult a healthcare professional for serious concerns."
  },
  {
    question: "Do I need to create an account?",
    answer: "A account is required to use the symptom checker, but we prioritize your privacy."
  },
  {
    question: "Can I use this for emergencies?",
    answer: "No. For emergencies, contact your local medical services immediately."
  }
];

export const recommendations = [
  "I have a headache and feel dizzy.",
  "I have a sore throat and a mild fever.",
  "I have a persistent cough and shortness of breath.",
];

export const extraRecommendations = [
  "I have a rash and itchy skin.",
  "I have a sharp pain in my chest.",
  "I have been feeling nauseous and vomiting.",
  "I have swelling in my joints.",
  "I have blurred vision and headaches.",
];