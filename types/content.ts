export interface Content {
  id: string;
  title: string;
  type: 'document' | 'video' | 'audio';
  url: string;
  uploadedAt: Date;
}

export interface GeneratedContent {
  lessons: Lesson[];
  quiz: Quiz;
  flashcards: Flashcard[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Quiz {
  id: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
} 