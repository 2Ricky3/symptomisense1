
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
    "transition-all duration-300 transform hover:bg-dark hover:text-bg hover:shadow-lg hover:scale-105 cursor-pointer " +
    "disabled:opacity-50 disabled:cursor-not-allowed",
  
  secondary: "text-accent hover:text-bg hover:bg-accent/20 hover:scale-105 transition-all duration-200 rounded px-2 py-1 cursor-pointer",
  
  small: "text-accent hover:text-bg hover:bg-accent/20 hover:scale-105 transition-all duration-200 rounded px-2 py-1 cursor-pointer text-sm hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4",
  
  edit: "rounded-md px-4 py-2 text-sm font-medium text-dark bg-bg border border-muted/30 shadow-md " +
    "transition-all duration-300 transform hover:bg-dark hover:text-bg hover:shadow-lg hover:scale-105 cursor-pointer " +
    "disabled:opacity-50 disabled:cursor-not-allowed text-sm",
  
  social: "w-full rounded-md px-5 py-3 text-base font-semibold text-dark bg-white border border-muted/30 shadow-md flex items-center justify-center gap-2 transition-all duration-300 transform hover:bg-gray-100 hover:shadow-lg hover:scale-105 cursor-pointer",
  
  danger: "px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition-all duration-200 cursor-pointer",

  checkSymptoms: "rounded-md px-6 py-3 text-base font-semibold text-[var(--color-bg)] bg-[var(--color-dark)] border border-[var(--color-dark)] shadow-md transition-all duration-300 transform hover:bg-[var(--color-accent)] hover:shadow-lg hover:scale-105 cursor-pointer"
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

export const healthcareProviders = {
  mentalHealth: [
    {
      name: "SADAG (South African Depression and Anxiety Group)",
      contact: "0800 567 567",
      website: "https://www.sadag.org",
      description: "Free mental health support and counseling services"
    },
    {
      name: "LifeLine Southern Africa",
      contact: "0861 322 322",
      website: "https://www.lifeline.org.za",
      description: "24/7 crisis helpline and suicide prevention"
    },
    {
      name: "Akeso Psychiatric Hospitals",
      contact: "086 999 0428",
      website: "https://www.akeso.co.za",
      description: "Private psychiatric care and mental health services"
    },
    {
      name: "South African College of Applied Psychology",
      contact: "011 447 3473",
      website: "https://www.sacap.edu.za/community-clinic",
      description: "Affordable community psychology services"
    }
  ],
  medical: [
    {
      name: "Discovery Health",
      contact: "0860 99 88 77",
      website: "https://www.discovery.co.za",
      description: "Medical aid and healthcare provider network"
    },
    {
      name: "Mediclinic",
      contact: "0860 999 911",
      website: "https://www.mediclinic.co.za",
      description: "Private hospital group with nationwide coverage"
    },
    {
      name: "Netcare",
      contact: "082 911 (Emergency) / 011 301 0000",
      website: "https://www.netcare.co.za",
      description: "Leading private healthcare provider in SA"
    },
    {
      name: "Life Healthcare",
      contact: "0861 001 108",
      website: "https://www.lifehealthcare.co.za",
      description: "Private hospital network and medical services"
    },
    {
      name: "HPCSA (Health Professions Council)",
      contact: "012 338 9300",
      website: "https://www.hpcsa.co.za",
      description: "Find registered healthcare practitioners"
    }
  ]
};