import React, { useEffect, useState } from 'react';
import { getAuthors, createAuthor } from '../api/api';
import { User, PlusCircle } from 'lucide-react';
import { Link } from "react-router-dom";
function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const res = await getAuthors();
      setAuthors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddAuthor = async (e) => {
    e.preventDefault();
    if (!name) return;

    try {
      await createAuthor({ name });
      setName('');
      fetchAuthors();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      {/* Header with form */}
      <div className="bg-white shadow-md rounded-lg p-5 mb-6">
        <form
          onSubmit={handleAddAuthor}
          className="flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <input
            type="text"
            placeholder="✍️ Author name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full md:w-2/3 p-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            <PlusCircle className="w-5 h-5" /> Add Author
          </button>
        </form>
      </div>

      {/* Authors Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {authors.map((author) => (
    <Link to={`/authors/${author.id}`} key={author.id}>
      <div className="p-5 rounded-xl shadow-lg bg-gradient-to-br from-pink-50 to-yellow-100 hover:shadow-2xl transition cursor-pointer">
        <h2 className="text-xl font-bold flex items-center gap-2 text-purple-800">
          <User className="w-5 h-5" /> {author.name}
        </h2>
      </div>
    </Link>
  ))}
</div>

      {authors.length === 0 && (
        <p className="text-center text-gray-600 mt-10 text-lg">
          No authors found 👩‍💻
        </p>
      )}
    </div>
  );
}

export default AuthorList;
