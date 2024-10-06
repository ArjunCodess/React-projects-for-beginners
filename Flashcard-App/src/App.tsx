"use client"

import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom'
import FlashcardForm from './components/FlashcardForm'
import FlashcardListPage from './components/FlashcardListPage'
import TestingPage from './components/TestingPage'

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  folder: string;
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block py-2 px-3 rounded md:p-0 transition-colors duration-200 ease-in-out ${
        isActive ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"
      } hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500`}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export default function App() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [score, setScore] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedFlashcards = localStorage.getItem('flashcards');
    if (storedFlashcards) {
      setFlashcards(JSON.parse(storedFlashcards));
    }
  }, []);

  const addFlashcard = (newCard: Omit<Flashcard, 'id'>) => {
    const updatedFlashcards = [...flashcards, { ...newCard, id: Date.now().toString() }];
    setFlashcards(updatedFlashcards);
    localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));
  };

  const existingFolders = Array.from(new Set(flashcards.map(card => card.folder)));

  const handleCorrectAnswer = () => {
    setScore(score + 1);
  };

  const handleResetScore = () => {
    setScore(0);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-200 ease-in-out">
        <nav className="bg-white shadow-sm rounded-lg m-4 dark:bg-gray-800 transition-colors duration-200 ease-in-out">
          <div className="w-full mx-auto max-w-screen-xl p-4">
            <div className="flex flex-wrap items-center justify-between">
              <Link to="/" className="flex items-center">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flashcard App</span>
              </Link>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
              </button>
              <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
                  <li><NavLink to="/">Home</NavLink></li>
                  <li><NavLink to="/list">Flashcard List</NavLink></li>
                  <li><NavLink to="/test">Test Yourself</NavLink></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-200 ease-in-out">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 md:p-8 transition-all duration-200 ease-in-out">
            <Routes>
              <Route path="/" element={<FlashcardForm onAddFlashcard={addFlashcard} existingFolders={existingFolders} />} />
              <Route path="/list" element={<FlashcardListPage flashcards={flashcards} />} />
              <Route path="/test" element={
                <TestingPage 
                  flashcards={flashcards} 
                  onCorrectAnswer={handleCorrectAnswer}
                  score={score}
                  onResetScore={handleResetScore}
                />
              } />
            </Routes>
          </div>
        </main>

        <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 transition-colors duration-200 ease-in-out">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023 <a href="https://flowbite.com/" className="hover:underline">Flashcard App™</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap justify-center items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">About</a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Contact</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </Router>
  )
}