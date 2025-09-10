import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuthorDetail } from "../api/api";
import { Book, User } from "lucide-react";

function AuthorDetail() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    fetchAuthor();
  }, []);

  const fetchAuthor = async () => {
    try {
      const res = await getAuthorDetail(id);
      setAuthor(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!author) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 text-purple-800">
        <User className="w-6 h-6" /> {author.name}
      </h1>

      <h2 className="mt-6 text-lg font-semibold text-gray-700 flex items-center gap-2">
        <Book className="w-5 h-5" /> Books by {author.name}
      </h2>

      {author.books && author.books.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {author.books.map((book) => (
            <li
              key={book.id}
              className="p-3 rounded-lg bg-gradient-to-r from-pink-50 to-purple-50 border border-purple-200"
            >
              <p className="font-medium">{book.title}</p>
              <p className="text-sm text-gray-600">
                Published: {book.published_year}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-gray-500">No books found 📚</p>
      )}
    </div>
  );
}

export default AuthorDetail;
