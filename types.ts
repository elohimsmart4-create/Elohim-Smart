
export enum Category {
  COMMUNICATION = 'Mawasiliano',
  BUSINESS = 'Biashara',
  LIFE_SKILLS = 'Ujuzi wa Maisha',
  DIGITAL_SKILLS = 'Ujuzi wa Kidijitali',
  LEADERSHIP = 'Uongozi',
  FINANCE = 'Fedha',
  SPIRITUAL = 'Hekima ya Kiroho'
}

export enum Language {
  SW = 'sw',
  EN = 'en'
}

export enum TimeSlot {
  MORNING = 'asubuhi',
  AFTERNOON = 'mchana',
  NIGHT = 'usiku'
}

export interface StreakData {
  count: number;
  lastReadDate: string | null;
}

export interface Lesson {
  id: string;
  title: string;
  content: string[];
  takeaway: string;
  category: Category;
  date: string;
  readTime: string;
  inspiration?: string;
  language: Language;
  timeSlot?: TimeSlot;
}

export enum PremiumType {
  COURSE = 'Course',
  EBOOK = 'Ebook',
  AUDIO = 'Audio Lesson',
  VIDEO = 'Video Short'
}

export interface PremiumItem {
  id: string;
  title: string;
  description: string;
  type: PremiumType;
  price: string;
  isUnlocked?: boolean;
  content?: string | string[];
  imageUrl: string;
  duration?: string;
}

export type View = 'home' | 'categories' | 'bookmarks' | 'lesson-detail' | 'premium' | 'premium-detail';
