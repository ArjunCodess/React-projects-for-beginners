import { useState } from 'react';
import FlashcardList from './FlashcardList';

interface Flashcard {
    id: string;
    question: string;
    answer: string
};

interface TestingPageProps {
  flashcards: Flashcard[];
  onCorrectAnswer: () => void;
  score: number;
  onResetScore: () => void;
}

function TestingPage({ flashcards }: TestingPageProps) {
  const [score, setScore] = useState(0);

  const handleCorrectAnswer = () => {
    setScore(score + 4);
  };

  const handleWrongAnswer = () => {
    setScore(score - 1);
  };

  const handleResetScore = () => {
    setScore(0);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Test Yourself</h1>
        <p className="text-muted-foreground">
          Review your flashcards and test your knowledge.
        </p>
      </div>
      <div className='py-4 sm:py-10 md:py-14'>
        <FlashcardList 
          flashcards={flashcards} 
          onCorrectAnswer={handleCorrectAnswer}
          onWrongAnswer={handleWrongAnswer}
        />
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Score: {score}</h2>
        <button 
          onClick={handleResetScore}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 py-2 px-4"
        >
          Reset Score
        </button>
      </div>
    </div>
  );
}

export default TestingPage;