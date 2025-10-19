import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const savePrompt = async (userId: string, promptText: string, responseText: string) => {
  try {
    const promptRef = collection(doc(collection(db, "users"), userId), "prompts");
    await addDoc(promptRef, {
      promptText,
      responseText,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving prompt: ", error);
  }
};


export const saveChat = async (userId: string, title: string) => {
  try {
    const chatRef = collection(doc(collection(db, "users"), userId), "chats");
    const chatDoc = await addDoc(chatRef, {
      title,
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp(),
    });
    return chatDoc.id; 
  } catch (error) {
    console.error("Error saving chat: ", error);
  }
};
