// src/pages/BookForm.jsx
import { useEffect, useState } from "react";
import { createBook, updateBook, getBook, getAuthors } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    published_year: "",
  });

  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    // fetch authors for dropdown
    getAuthors().then((res) => setAuthors(res.data));

    // if editing, fetch book details
    if (id) {
      getBook(id).then((res) => setFormData(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        published_year: Number(formData.published_year),
      };
      if (id) {
        await updateBook(id, dataToSend);
      } else {
        await createBook(dataToSend);
      }
      navigate("/books");
    } catch (err) {
      console.error("Error saving book:", err.response?.data || err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">
        {id ? "Edit Book" : "Add New Book"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book Title"
          className="w-full p-2 border rounded"
          required
        />

        {/* Dropdown for Authors */}
        <select
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Author</option>
          {authors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="published_year"
          value={formData.published_year}
          onChange={handleChange}
          placeholder="Published Year"
          className="w-full p-2 border rounded"
          required
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Save
        </button>
      </form>
    </div>
  );
}
