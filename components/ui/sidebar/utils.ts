import { BookOpen, FileText } from 'lucide-react';

export const getTypeIcon = (type: string) => {
  switch (type) {
    case 'quiz':
      return FileText;
    case 'flashcards':
      return BookOpen;
    default:
      return FileText;
  }
}; 