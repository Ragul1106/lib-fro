import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Calendar } from 'lucide-react';

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [searchAuthor, setSearchAuthor] = useState('');

  useEffect(() => {
    fetchBooks();
  }, [searchAuthor]);

  const fetchBooks = async () => {
    try {
      const res = await getBooks(searchAuthor);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  return (
    <div className="w-full">
      {/* Header with search + button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 sticky top-16 bg-white p-4 rounded-lg shadow z-10">
        <input
          type="text"
          placeholder="🔍 Search by author..."
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-indigo-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => navigate("/books/new")}
          className="mt-3 md:mt-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition"
        >
          ➕ Add Book
        </button>

      </div>

      {/* Books Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="p-5 rounded-xl shadow-lg bg-gradient-to-br from-indigo-50 to-purple-100 hover:shadow-2xl transition"
          >
            <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-800">
              <BookOpen className="w-5 h-5" /> {book.title}
            </h2>
            <p className="mt-2 text-sm flex items-center gap-2 text-gray-700">
              <User className="w-4 h-4" /> Author: {book.author}
            </p>
            <p className="mt-1 text-sm flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4" /> Year: {book.published_year}
            </p>
            <p className="mt-1 italic text-indigo-600">📖 Age: {book.book_age} years</p>

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/books/edit/${book.id}`)}
                className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(book.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <p className="text-center text-gray-600 mt-10 text-lg">No books found 📭</p>
      )}
    </div>
  );
}

export default BookList;
