import React, { useState } from "react";
import "../styles/BookmarkList.css";
import { FaBookmark } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

function BookmarkList({ bookmarks, deleteBookmark, setEditBookmark }) {
  const [searchText, setSearchText] = useState("");

  const filteredBookmarks = bookmarks.filter(
    (b) =>
      b.title.toLowerCase().includes(searchText.toLowerCase()) ||
      b.url.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <>
      <div className="bookmark-list">
        <h3>
          Saved Bookmarks <FaBookmark className="bookmark-icon" />
          <input
            type="search"
            placeholder="Search bookmarks..."
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </h3>

        <div className="bookmark-content">
          {filteredBookmarks.length === 0 ? (
            <p className="empty">No bookmarks added</p>
          ) : (
            filteredBookmarks.map((b) => (
              <div key={b.id} className="bookmark-list1">
                <a href={b.url} target="_blank" rel="noopener noreferrer">
                  {b.title}
                </a>
                <MdDelete
                  className="dlt-icon"
                  onClick={() => deleteBookmark(b.id)}
                />
                <MdEdit
                  className="edit-icon"
                  onClick={() => setEditBookmark(b)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default BookmarkList;
