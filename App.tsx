
import React, { useState, useEffect } from 'react';
import { View, Category, Lesson, Language, StreakData, TimeSlot, PremiumItem } from './types';
import { generateTimedLesson } from './geminiService';
import Header from './components/Header';
import LessonCard from './components/LessonCard';
import LessonDetail from './components/LessonDetail';
import CategoryPicker from './components/CategoryPicker';
import BookmarkList from './components/BookmarkList';
import LoadingSpinner from './components/LoadingSpinner';
import InfoModal from './components/InfoModal';
import PremiumSection from './components/PremiumSection';
import PremiumDetail from './components/PremiumDetail';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [dailyLesson, setDailyLesson] = useState<Lesson | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedPremium, setSelectedPremium] = useState<PremiumItem | null>(null);
  const [unlockedItems, setUnlockedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('minute-class-unlocked');
    return saved ? JSON.parse(saved) : [];
  });
  const [bookmarks, setBookmarks] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [streak, setStreak] = useState<StreakData>(() => {
    const saved = localStorage.getItem('minute-class-streak');
    return saved ? JSON.parse(saved) : { count: 0, lastReadDate: null };
  });
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('minute-class-lang');
    return (saved as Language) || Language.SW;
  });

  const getCurrentTimeSlot = (): TimeSlot => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return TimeSlot.MORNING;
    if (hour >= 12 && hour < 18) return TimeSlot.AFTERNOON;
    return TimeSlot.NIGHT;
  };

  const getSlotTheme = (slot: TimeSlot) => {
    if (currentView === 'premium') return 'bg-premium-gold';
    switch (slot) {
      case TimeSlot.MORNING: return 'bg-morning';
      case TimeSlot.AFTERNOON: return 'bg-afternoon';
      default: return 'bg-night';
    }
  };

  const translations = {
    [Language.SW]: {
      loading: "AI inachuja hekima ya leo...",
      morning: "Habari ya Asubuhi!",
      afternoon: "Mchana Mwema!",
      night: "Tafakari ya Usiku",
      discover: "Gundua Zaidi",
      viewAll: "Mada Zote",
      navToday: "Leo",
      navTopics: "Mada",
      navLibrary: "Maktaba",
      navPremium: "Premium"
    },
    [Language.EN]: {
      loading: "AI is filtering today's wisdom...",
      morning: "Good Morning!",
      afternoon: "Good Afternoon!",
      night: "Night Reflection",
      discover: "Discover More",
      viewAll: "All Topics",
      navToday: "Today",
      navTopics: "Topics",
      navLibrary: "Library",
      navPremium: "Premium"
    }
  };

  const t = translations[language];

  const fetchAutomatedLesson = async (cat?: Category) => {
    const slot = getCurrentTimeSlot();
    const today = new Date().toDateString();
    const storageKey = `minute-class-lesson-${slot}-${today}-${language}`;
    
    if (!cat) {
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        setDailyLesson(JSON.parse(cached));
        return;
      }
    }

    setIsLoading(true);
    try {
      const lesson = await generateTimedLesson(slot, cat, language);
      if (!cat) localStorage.setItem(storageKey, JSON.stringify(lesson));
      setDailyLesson(lesson);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAutomatedLesson(selectedCategory || undefined);
    const saved = localStorage.getItem('minute-class-bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
  }, [language, selectedCategory]);

  const updateStreak = () => {
    const today = new Date().toDateString();
    if (streak.lastReadDate === today) return;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const count = (streak.lastReadDate === yesterday.toDateString()) ? streak.count + 1 : 1;
    const newStreak = { count, lastReadDate: today };
    setStreak(newStreak);
    localStorage.setItem('minute-class-streak', JSON.stringify(newStreak));
  };

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
    setCurrentView('home');
  };

  const handleUnlock = (id: string) => {
    const next = [...unlockedItems, id];
    setUnlockedItems(next);
    localStorage.setItem('minute-class-unlocked', JSON.stringify(next));
  };

  const toggleBookmark = (lesson: Lesson) => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.id === lesson.id);
      const next = exists ? prev.filter(b => b.id !== lesson.id) : [...prev, lesson];
      localStorage.setItem('minute-class-bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const currentSlot = getCurrentTimeSlot();

  return (
    <div className={`min-h-screen pb-36 transition-all duration-1000 ${getSlotTheme(currentSlot)}`}>
      <div className="max-w-xl mx-auto bg-white/40 backdrop-blur-2xl border-x border-white/20 min-h-screen shadow-2xl relative">
        <Header 
          currentView={currentView} 
          setView={setCurrentView} 
          language={language}
          streakCount={streak.count}
          onLanguageToggle={() => {
            const nextLang = language === Language.SW ? Language.EN : Language.SW;
            setLanguage(nextLang);
            localStorage.setItem('minute-class-lang', nextLang);
          }}
          onInfoClick={() => setShowInfo(true)}
          onHomeClick={() => { setSelectedCategory(null); setCurrentView('home'); }}
        />

        <main className="px-6 py-10">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <LoadingSpinner />
              <p className="mt-8 text-slate-500 font-bold text-xs uppercase tracking-[0.4em] animate-pulse text-center max-w-[200px] leading-relaxed">
                {t.loading}
              </p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              {currentView === 'home' && dailyLesson && (
                <div className="space-y-12">
                  <section>
                      <div className="flex items-center justify-between mb-8">
                          <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="w-6 h-px bg-indigo-500 opacity-40"></span>
                                <h2 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em]">
                                  {selectedCategory ? selectedCategory : (language === Language.SW ? "Somo la Leo" : "Daily Highlight")}
                                </h2>
                              </div>
                              <h3 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                                {currentSlot === TimeSlot.MORNING ? t.morning : currentSlot === TimeSlot.AFTERNOON ? t.afternoon : t.night}
                              </h3>
                          </div>
                          <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-xl shadow-premium animate-float">
                            {currentSlot === TimeSlot.MORNING ? '🌅' : currentSlot === TimeSlot.AFTERNOON ? '☀️' : '🌙'}
                          </div>
                      </div>
                      
                      <LessonCard 
                        lesson={dailyLesson} 
                        onClick={() => { setSelectedLesson(dailyLesson); setCurrentView('lesson-detail'); updateStreak(); }}
                        isBookmarked={bookmarks.some(b => b.id === dailyLesson.id)}
                        onBookmark={() => toggleBookmark(dailyLesson)}
                      />
                  </section>

                  <section className="pt-4">
                      <div className="flex items-center justify-between mb-6 px-1">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{t.discover}</h3>
                        <button onClick={() => setCurrentView('categories')} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors">
                          {t.viewAll}
                        </button>
                      </div>
                      <div className="flex space-x-4 overflow-x-auto pb-6 -mx-6 px-6 scrollbar-hide">
                          {Object.values(Category).map(cat => (
                              <button 
                                  key={cat}
                                  onClick={() => handleCategorySelect(cat)}
                                  className={`shrink-0 px-8 py-5 rounded-3xl border transition-all group text-sm font-black shadow-premium ${selectedCategory === cat ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100/50 text-slate-700 hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-500/5'}`}
                              >
                                  <span className={selectedCategory === cat ? '' : 'group-hover:text-indigo-600 transition-colors'}>{cat}</span>
                              </button>
                          ))}
                      </div>
                  </section>
                </div>
              )}

              {currentView === 'categories' && <CategoryPicker onSelect={handleCategorySelect} language={language} />}
              {currentView === 'bookmarks' && <BookmarkList bookmarks={bookmarks} onOpenLesson={(l) => { setSelectedLesson(l); setCurrentView('lesson-detail'); }} onRemove={toggleBookmark} language={language} />}
              {currentView === 'premium' && <PremiumSection language={language} unlockedItems={unlockedItems} onSelectItem={(item) => { setSelectedPremium(item); setCurrentView('premium-detail'); }} />}
              {currentView === 'premium-detail' && selectedPremium && <PremiumDetail item={selectedPremium} isUnlocked={unlockedItems.includes(selectedPremium.id)} onUnlock={handleUnlock} onBack={() => setCurrentView('premium')} language={language} />}
              {currentView === 'lesson-detail' && selectedLesson && (
                <LessonDetail 
                  lesson={selectedLesson} 
                  onBack={() => {
                    setSelectedLesson(null);
                    setCurrentView('home');
                  }} 
                  isBookmarked={bookmarks.some(b => b.id === selectedLesson.id)}
                  onBookmark={() => toggleBookmark(selectedLesson)}
                  language={language}
                />
              )}
            </div>
          )}
        </main>

        {showInfo && <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} language={language} streakCount={streak.count} />}

        <div className="fixed bottom-8 left-0 right-0 z-50 px-6">
          <nav className="max-w-md mx-auto glass-panel rounded-[2.5rem] p-2 shadow-2xl flex justify-between items-center border border-white/40">
            <NavButton active={currentView === 'home'} onClick={() => { setSelectedCategory(null); setCurrentView('home'); }} label={t.navToday} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>} />
            <NavButton active={currentView === 'categories'} onClick={() => setCurrentView('categories')} label={t.navTopics} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h7" /></svg>} />
            <NavButton active={currentView === 'bookmarks'} onClick={() => setCurrentView('bookmarks')} label={t.navLibrary} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>} />
            <NavButton active={currentView === 'premium'} onClick={() => setCurrentView('premium')} label={t.navPremium} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15l-2 5L9 9l11 4-5 2zm0 0l4 4" /></svg>} isPremium />
          </nav>
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ active, onClick, label, icon, isPremium }: { active: boolean, onClick: () => void, label: string, icon: React.ReactNode, isPremium?: boolean }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center space-x-2 px-4 py-3 rounded-full transition-all duration-500 relative ${active ? (isPremium ? 'bg-amber-500 text-white shadow-xl shadow-amber-200' : 'bg-slate-900 text-white shadow-xl') : 'text-slate-400 hover:text-slate-600'}`}
  >
    {icon}
    {active && <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>}
    {active && <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full border-2 border-white ${isPremium ? 'bg-white' : 'bg-indigo-500'}`}></span>}
  </button>
);

export default App;
