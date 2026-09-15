export interface BookTopic {
  id: string;
  titleRu: string;
  titleDe: string;
  icon: string;
  description: string;
  funFact: string;
  sampleWords: { de: string; ru: string; phonetic?: string }[];
}

export interface PracticeCard {
  id: string;
  type: 'word' | 'phrase' | 'idiom' | 'quiz';
  german: string;
  russian: string;
  pronunciation?: string;
  exampleDe?: string;
  exampleRu?: string;
  humorNote?: string;
  category: string;
}

// Retain alias for backward compatibility
export type HatCard = PracticeCard;

export interface QuizQuestion {
  id: string;
  questionDe: string;
  questionRu: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TextbookPage {
  pageNumber: number;
  title: string;
  section: string;
  summary: string;
  germanHighlights: string[];
  imageUrl?: string;
}

export interface DachCountryFact {
  country: string;
  flag: string;
  capital: string;
  fact: string;
  teenCultureFact: string;
}

export type AppTab = 'annotation' | 'topics' | 'practice' | 'textbook';

