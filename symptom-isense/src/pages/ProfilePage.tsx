import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import type { User } from "firebase/auth";
import { FaSearch, FaTrash, FaRegFolderOpen, FaHistory, FaFileAlt, FaClock, FaEdit, FaFilter, FaTimes, FaChevronUp } from "react-icons/fa";
import BackButton from "../components/ui/BackButton";
import Button from "../components/ui/Button";
import ConfirmationDialog from "../components/ui/ConfirmationDialog";
import { SkeletonProfileCard, SkeletonHistoryCard } from "../components/ui/Skeleton";
import Avatar from "../components/ui/Avatar";
import StatCard from "../components/ui/StatCard";
import AvatarSelector from "../components/ui/AvatarSelector";
import PromptCard from "../components/ui/PromptCard";
import { getUserProfile, createUserProfile, updateUserProfile, type UserProfile } from "../services/userProfileService";

interface Prompt {
  id: string;
  promptText: string;
  responseText: string;
  soapNote?: string;
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
  const [showPopup, setShowPopup] = useState(false);
  const [popupAction, setPopupAction] = useState<() => void>(() => {});
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [displayCount, setDisplayCount] = useState(5);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchData = async () => {
      try {
        let profile = await getUserProfile(user.uid);
        if (!profile) {
          await createUserProfile(user.uid, user.email || '');
          profile = await getUserProfile(user.uid);
        }
        setUserProfile(profile);

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
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    if (!keyword.trim()) {
      setFilteredPrompts(prompts);
      return;
    }
    
    setDisplayCount(5);
    const filtered = prompts.filter((prompt) => {
      const searchTerm = keyword.toLowerCase();
      return (
        prompt.promptText.toLowerCase().includes(searchTerm) ||
        prompt.responseText.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredPrompts(filtered);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setKeyword("");
    setDisplayCount(5);
    if (filter === "7days") filterByTime(7);
    else if (filter === "30days") filterByTime(30);
    else setFilteredPrompts(prompts);
  };

  const handleDeleteAll = () => {
    setPopupAction(() => async () => {
      try {
        const promptsQuery = query(collection(db, "users", user?.uid || "", "prompts"));
        const promptsSnapshot = await getDocs(promptsQuery);

        const deletePromises = promptsSnapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        setPrompts([]);
        setFilteredPrompts([]);
      } catch (error) {
        console.error("Error deleting all prompts: ", error);
      } finally {
        setShowPopup(false);
      }
    });
    setShowPopup(true);
  };

  const handleDeletePrompt = (promptId: string) => {
    setPopupAction(() => async () => {
      try {
        await deleteDoc(doc(db, "users", user?.uid || "", "prompts", promptId));

        const updatedPrompts = prompts.filter((prompt) => prompt.id !== promptId);
        setPrompts(updatedPrompts);
        setFilteredPrompts(updatedPrompts);
      } catch (error) {
        console.error("Error deleting prompt: ", error);
      } finally {
        setShowPopup(false);
      }
    });
    setShowPopup(true);
  };

  const handleAvatarSelect = async (avatarName: string) => {
    if (user && userProfile) {
      await updateUserProfile(user.uid, { avatar: avatarName });
      setUserProfile({ ...userProfile, avatar: avatarName });
    }
  };

  const getStats = () => {
    const total = prompts.length;
    const lastWeek = prompts.filter(p => {
      if (!p.createdAt) return false;
      const diffDays = (new Date().getTime() - p.createdAt.toDate().getTime()) / (1000 * 60 * 60 * 24);
      return diffDays <= 7;
    }).length;
    const lastMonth = prompts.filter(p => {
      if (!p.createdAt) return false;
      const diffDays = (new Date().getTime() - p.createdAt.toDate().getTime()) / (1000 * 60 * 60 * 24);
      return diffDays <= 30;
    }).length;

    return { total, lastWeek, lastMonth };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg via-bg to-muted flex flex-col">
        <header className="w-full z-50 sticky top-0">
          <nav className="flex items-center justify-between p-4 lg:px-6" aria-label="Global">
            <BackButton onClick={onHomeClick} className="-ml-2" />
          </nav>
        </header>

        <main className="flex-1 flex flex-col items-center px-4 pt-20 lg:px-6">
          <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-6">
            <SkeletonProfileCard />
            
            <div className="mt-8 mb-6">
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="flex gap-4 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 flex-1 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            </div>

            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <SkeletonHistoryCard key={i} />
              ))}
            </div>
          </div>
        </main>

        <footer className="w-full text-muted text-xs text-center py-2 bg-transparent mt-auto">
          &copy; 2025 Symptom-iSense. All rights reserved.
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg to-muted flex flex-col">
      {showPopup && (
        <ConfirmationDialog
          message="Are you sure you want to proceed with this action?"
          onConfirm={popupAction}
          onCancel={() => setShowPopup(false)}
          isOpen={showPopup}
        />
      )}

      {showAvatarSelector && (
        <AvatarSelector
          onSelect={handleAvatarSelect}
          currentAvatar={userProfile?.avatar}
          onClose={() => setShowAvatarSelector(false)}
        />
      )}

      <header className="w-full z-50 sticky top-0">
        <nav className="flex items-center justify-between p-4 lg:px-6" aria-label="Global" data-aos="fade-down">
          <BackButton onClick={onHomeClick} />
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 pt-8 lg:px-6 pb-8">
        <div className="w-full max-w-6xl mb-8" data-aos="fade-up">
          <div className="bg-gradient-to-r from-primary via-accent to-primary p-[2px] rounded-2xl">
            <div className="bg-white rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative group">
                  <Avatar
                    avatar={userProfile?.avatar || 'default'}
                    size="xl"
                    className="ring-4 ring-white shadow-xl"
                  />
                  <button
                    onClick={() => setShowAvatarSelector(true)}
                    className="absolute bottom-0 right-0 bg-[#152026] text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    aria-label="Edit avatar"
                  >
                    <FaEdit className="text-base" />
                  </button>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-dark mb-2">
                    {user?.email?.split('@')[0] || 'User Profile'}
                  </h1>
                  <p className="text-muted mb-4 flex items-center justify-center md:justify-start gap-2">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                    {user?.email || 'N/A'}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6">
                    <StatCard
                      icon={FaFileAlt}
                      label="Total Checks"
                      value={getStats().total}
                      color="text-primary"
                      delay={100}
                    />
                    <StatCard
                      icon={FaClock}
                      label="This Week"
                      value={getStats().lastWeek}
                      color="text-accent"
                      delay={150}
                    />
                    <StatCard
                      icon={FaHistory}
                      label="This Month"
                      value={getStats().lastMonth}
                      color="text-blue-600"
                      delay={200}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-6xl" data-aos="fade-up" data-aos-delay="300">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 overflow-visible">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-6 border-b border-gray-200 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#293540] mb-1">Your Health History</h2>
                <p className="text-sm text-[#5C6A73]">
                  Showing {Math.min(displayCount, filteredPrompts.length)} of {filteredPrompts.length} {filteredPrompts.length === 1 ? 'record' : 'records'}
                  {prompts.length !== filteredPrompts.length && ` (${prompts.length} total)`}
                </p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                {(keyword || (activeFilter && activeFilter !== "all")) && (
                  <button
                    onClick={() => {
                      setKeyword("");
                      handleFilterClick("all");
                      setShowFilters(false);
                    }}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-red-700 transform hover:-translate-y-0.5 transition-all duration-300 text-sm"
                    aria-label="Clear all filters"
                  >
                    <FaTimes />
                    <span className="hidden xs:inline">Clear</span>
                  </button>
                )}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#152026] text-white rounded-lg shadow-md hover:shadow-lg hover:bg-[#293540] transform hover:-translate-y-0.5 transition-all duration-300 text-sm"
                >
                  <FaFilter />
                  <span className="hidden xs:inline">Filters</span>
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 transition-all duration-300" data-aos="fade-down">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#293540]">Filter Options</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-[#5C6A73] hover:text-[#293540] transition-colors duration-300 ease-in-out"
                    aria-label="Close filters"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-medium text-[#293540] mb-2 block">Time Period</label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleFilterClick("7days")}
                      className={`px-4 py-2 rounded-lg shadow-sm transform hover:-translate-y-0.5 transition-all duration-300 ${
                        activeFilter === "7days"
                          ? "bg-[#152026] text-white shadow-md"
                          : "bg-white text-[#293540] border border-gray-300 hover:border-[#152026] hover:shadow-md"
                      }`}
                    >
                      Last 7 Days
                    </button>
                    <button
                      onClick={() => handleFilterClick("30days")}
                      className={`px-4 py-2 rounded-lg shadow-sm transform hover:-translate-y-0.5 transition-all duration-300 ${
                        activeFilter === "30days"
                          ? "bg-[#152026] text-white shadow-md"
                          : "bg-white text-[#293540] border border-gray-300 hover:border-[#152026] hover:shadow-md"
                      }`}
                    >
                      Last 30 Days
                    </button>
                    <button
                      onClick={() => handleFilterClick("all")}
                      className={`px-4 py-2 rounded-lg shadow-sm transform hover:-translate-y-0.5 transition-all duration-300 ${
                        activeFilter === "all"
                          ? "bg-[#152026] text-white shadow-md"
                          : "bg-white text-[#293540] border border-gray-300 hover:border-[#152026] hover:shadow-md"
                      }`}
                    >
                      All Time
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-medium text-[#293540] mb-2 block">Search by Keyword</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && filterByKeyword()}
                        placeholder="Search symptoms, conditions..."
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#152026] focus:border-transparent transition-all duration-300 ease-in-out"
                      />
                      {keyword && (
                        <button
                          onClick={() => {
                            setKeyword("");
                            setFilteredPrompts(prompts);
                            setActiveFilter(null);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                          aria-label="Clear search"
                        >
                          <FaTimes className="text-sm" />
                        </button>
                      )}
                    </div>
                    <button
                      onClick={filterByKeyword}
                      className="w-full sm:w-auto px-6 py-2 bg-[#152026] text-white rounded-lg shadow-md hover:shadow-lg hover:bg-[#293540] transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaSearch />
                      <span>Search</span>
                    </button>
                  </div>
                </div>

                {prompts.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <Button
                      variant="danger"
                      onClick={handleDeleteAll}
                      className="flex items-center gap-2"
                    >
                      <FaTrash /> Delete All Records
                    </Button>
                  </div>
                )}
              </div>
            )}

            {filteredPrompts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-full p-8 mb-6">
                  <FaRegFolderOpen className="text-6xl text-[#5C6A73]" />
                </div>
                <h3 className="text-xl font-semibold text-[#293540] mb-2">No Records Found</h3>
                <p className="text-[#5C6A73] text-center max-w-md">
                  {keyword || activeFilter !== "all" 
                    ? "Try adjusting your filters or search terms using the Clear button above" 
                    : "Start by checking your symptoms to see your health history here"}
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-4 mb-6">
                  {filteredPrompts.slice(0, displayCount).map((prompt, idx) => {
                    return (
                      <div key={prompt.id} className="w-full min-h-[100px]">
                        <PromptCard
                          prompt={prompt}
                          onDelete={handleDeletePrompt}
                          index={idx}
                        />
                      </div>
                    );
                  })}
                </div>
                
                {filteredPrompts.length > displayCount && (
                  <div className="flex justify-center pt-4 pb-2">
                    <button
                      onClick={() => setDisplayCount(prev => prev + 5)}
                      className="px-3 sm:px-4 py-2 rounded-full shadow transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg bg-white text-black border border-muted/30 flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <FaHistory className="text-base sm:text-lg" />
                      <span className="hidden xs:inline">Load More Records</span>
                      <span className="xs:hidden">More</span>
                      <span className="bg-gray-100 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                        {filteredPrompts.length - displayCount}
                      </span>
                    </button>
                  </div>
                )}
                
                {displayCount > 5 && displayCount >= filteredPrompts.length && (
                  <div className="flex justify-center pt-4 pb-2">
                    <button
                      onClick={() => setDisplayCount(5)}
                      className="px-3 sm:px-4 py-2 rounded-full shadow transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg bg-white text-black border border-muted/30 flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <FaChevronUp />
                      <span>Show Less</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full text-muted text-xs text-center py-6 bg-gradient-to-t from-gray-50 to-transparent mt-8 border-t border-gray-200">
        <p className="mb-1">&copy; 2025 Symptom-iSense. All rights reserved.</p>
        <p className="text-xs">Your health information is private and secure.</p>
      </footer>
    </div>
  );
};

export default ProfilePage;