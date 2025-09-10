import axios from 'axios';

const API = axios.create({
  baseURL: 'https://lib-back-ib9t.onrender.com/',
  headers: { 'Content-Type': 'application/json' },
});

// Books
export const getBooks = (authorName) =>
  API.get("/books/", { params: authorName ? { author: authorName } : {} });
export const getBook = (id) => API.get(`/books/${id}/`);
export const createBook = (data) => API.post("/books/", data);
export const updateBook = (id, data) => API.put(`/books/${id}/`, data);
export const deleteBook = (id) => API.delete(`/books/${id}/`);

// Authors
export const getAuthors = () => API.get("/authors/");
export const createAuthor = (data) => API.post("/authors/", data);
export const getAuthorDetail = (id) => API.get(`/authors/${id}/`);
