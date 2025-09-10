import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import BookList from './components/BookList';
import AuthorList from './components/AuthorList';
import BookForm from "./components/BookForm";
import AuthorDetail from "./components/AuthorDetail";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-rose-300 to-yellow-100">
      {/* Navbar with animated gradient */}
      <nav className="relative overflow-hidden px-6 py-4 flex justify-between items-center shadow-xl rounded-b-xl">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 animate-gradient-x -z-10"></div>

        {/* Navbar content */}
        <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-md flex items-center gap-2 z-10 text-white">
          <span>📚</span> My Library
        </h1>
        <div className="flex space-x-6 z-10">
          {/* Books Link */}
          <Link
            to="/books"
            className="relative px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-pink-400 to-purple-500 shadow-md text-white group transition-all duration-300 hover:scale-105 hover:shadow-xl hover:brightness-110"
          >
            Books
            <span className="absolute left-0 -bottom-1 w-0 h-1 bg-white rounded-full transition-all group-hover:w-full"></span>
          </Link>

          {/* Authors Link */}
          <Link
            to="/authors"
            className="relative px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-green-400 to-blue-500 shadow-md text-white group transition-all duration-300 hover:scale-105 hover:shadow-xl hover:brightness-110"
          >
            Authors
            <span className="absolute left-0 -bottom-1 w-0 h-1 bg-white rounded-full transition-all group-hover:w-full"></span>
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<h1 className="text-4xl font-bold text-indigo-700">Welcome To My Library 📚</h1>} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm />} />
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/authors/:id" element={<AuthorDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
