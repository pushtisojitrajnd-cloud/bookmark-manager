import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/BookmarkForm.css";

const BookmarkForm = ({ addBookmark, editBookmark, updateBookmark}) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (editBookmark) {
      setTitle(editBookmark.title);
      setUrl(editBookmark.url);
    }
  }, [editBookmark]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !url) return;

    addBookmark({ title, url });

    setTitle("");
    setUrl("");
  };

  return (
    <div className="form-container">
      <h3>Add New Bookmark</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Bookmark Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="url"
          placeholder="Bookmark URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default BookmarkForm;
