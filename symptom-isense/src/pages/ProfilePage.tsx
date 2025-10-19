import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import type { User } from "firebase/auth";
import { FaSearch, FaTrash, FaRegFolderOpen } from "react-icons/fa";

interface Prompt {
  id: string;
  promptText: string;
  responseText: string;
  createdAt?: { toDate: () => Date };
}

interface ProfilePageProps {
  user: User | null;
  onHomeClick: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onHomeClick }) => {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const smallButtonClasses =
    "text-accent hover:text-bg hover:bg-accent/20 hover:scale-105 transition-all duration-200 rounded px-2 py-1 cursor-pointer text-sm hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4";

  useEffect(() => {
    console.log("ProfilePage rendered");
    console.log("User:", user);

    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchHistory = async () => {
      try {
        const promptsQuery = query(
          collection(db, "users", user.uid, "prompts")
        );

        const promptsSnapshot = await getDocs(promptsQuery);

        const fetchedPrompts = promptsSnapshot.docs.map((doc) => {
          const data = doc.data() as Prompt;
          return { ...data, id: doc.id };
        });

        setPrompts(fetchedPrompts);
        setFilteredPrompts(fetchedPrompts);
      } catch (error) {
        console.error("Error fetching history: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, navigate]);

  const filterByTime = (days: number) => {
    const now = new Date();
    const filtered = prompts.filter((prompt) => {
      if (!prompt.createdAt) return false;
      const promptDate = prompt.createdAt.toDate();
      const diffTime = now.getTime() - promptDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays <= days;
    });
    setFilteredPrompts(filtered);
  };

  const filterByKeyword = () => {
    const filtered = prompts.filter((prompt) =>
      prompt.promptText.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredPrompts(filtered);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "7days") filterByTime(7);
    else if (filter === "30days") filterByTime(30);
    else setFilteredPrompts(prompts);
  };

  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete all prompts? This action cannot be undone.")) {
      try {
        const promptsQuery = query(collection(db, "users", user?.uid || "", "prompts"));
        const promptsSnapshot = await getDocs(promptsQuery);

        const deletePromises = promptsSnapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        setPrompts([]);
        setFilteredPrompts([]);
        alert("All prompts have been deleted.");
      } catch (error) {
        console.error("Error deleting all prompts: ", error);
        alert("Failed to delete all prompts. Please try again.");
      }
    }
  };

  const handleDeletePrompt = async (promptId: string) => {
    if (window.confirm("Are you sure you want to delete this prompt? This action cannot be undone.")) {
      try {
        await deleteDoc(doc(db, "users", user?.uid || "", "prompts", promptId));

        const updatedPrompts = prompts.filter((prompt) => prompt.id !== promptId);
        setPrompts(updatedPrompts);
        setFilteredPrompts(updatedPrompts);
        alert("Prompt deleted successfully.");
      } catch (error) {
        console.error("Error deleting prompt: ", error);
        alert("Failed to delete the prompt. Please try again.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg to-muted flex flex-col">
      <header className="w-full z-50 sticky top-0">
        <nav className="flex items-center justify-between p-4 lg:px-6" aria-label="Global">
          <button
            type="button"
            className={`${smallButtonClasses} -ml-2`}
            onClick={onHomeClick}
          >
            ← Back to Home
          </button>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 pt-20 lg:px-6">
        <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">Profile</h1>
          <p className="text-lg mb-4">Email: {user?.email || "N/A"}</p>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Filters</h2>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => handleFilterClick("7days")}
                className={`px-4 py-2 rounded-md shadow transition-all duration-200 ${
                  activeFilter === "7days"
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-white text-black border border-muted/30"
                }`}
              >
                Last 7 Days
              </button>
              <button
                onClick={() => handleFilterClick("30days")}
                className={`px-4 py-2 rounded-md shadow transition-all duration-200 ${
                  activeFilter === "30days"
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-white text-black border border-muted/30"
                }`}
              >
                Last 30 Days
              </button>
              <button
                onClick={() => handleFilterClick("all")}
                className={`px-4 py-2 rounded-md shadow transition-all duration-200 ${
                  activeFilter === "all"
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-white text-black border border-muted/30"
                }`}
              >
                All Time
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by keyword"
                className="px-4 py-2 border border-muted/30 rounded-md w-full"
              />
              <button
                onClick={filterByKeyword}
                className="px-4 py-2 bg-white text-black border border-muted/30 rounded-md shadow transition-all duration-200 hover:scale-105 flex items-center gap-2"
              >
                <FaSearch />
                Search
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={handleDeleteAll}
                className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition-all duration-200"
              >
                Delete All
              </button>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Prompts</h2>
          {filteredPrompts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-muted mt-10">
              <FaRegFolderOpen className="text-6xl mb-4" />
              <p className="text-lg">Nothing here yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="bg-white/70 rounded-lg p-4 shadow transform transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:bg-accent/10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 motion-safe:transform-gpu"
                >
                  <h4 className="font-semibold text-md mb-1">{prompt.promptText}</h4>
                  <p className="text-muted text-sm">{prompt.responseText}</p>
                  <p className="text-xs text-gray-500">{prompt.createdAt?.toDate().toLocaleString()}</p>
                  <button
                    onClick={() => handleDeletePrompt(prompt.id)}
                    className="mt-2 px-3 py-1 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition-all duration-200 flex items-center gap-2"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="w-full text-muted text-xs text-center py-2 bg-transparent mt-auto">
        &copy; 2025 Symptom-iSense. All rights reserved.
      </footer>
    </div>
  );
};

export default ProfilePage;