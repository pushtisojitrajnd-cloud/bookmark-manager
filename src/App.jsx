import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import BookmarkForm from "./components/BookmarkForm";
import BookmarkList from "./components/BookmarkList";
import "./index.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://69687c8869178471522a9d57.mockapi.io/book-mark/list";

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [editBookmark, setEditBookmark] = useState(null);

  //UPDATE bookmark
  const updateBookmark = async (id, updatedData) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content=Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const updatedBookmark = await res.json();

      const updatedList = bookmarks.map((b) =>
        b.id === id ? updatedBookmark : b
      );

      setBookmarks(updatedList);
      setEditBookmark(null);
      toast.success("Bookmark Updated Successfully");
    } catch (error) {
      toast.error("Error updating bookmark");
    }
  };

  //GET bookmarks
  const fetchBookmarks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBookmarks(data);
    } catch (error) {
      console.error("Error fertching bookmarks", error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  //ADD BOOKMARK
  const addBookmark = async (Bookmark) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Bookmark),
      });

      const newBookmark = await res.json();
      setBookmarks([...bookmarks, newBookmark]);
      toast.success("Bookmark added successfully!");
    } catch (error) {
      toast.error("Error adding bookmark");
    }
  };

  //DELETE BOOKMARK
  const deleteBookmark = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      setBookmarks(bookmarks.filter((b) => b.id !== id));
      toast.info("Bookmark deleted");
    } catch (error) {
      toast.error("Error deleting bookmark");
    }
  };

  return (
    <>
      <Navbar />
      <Header />
      <BookmarkForm addBookmark={addBookmark} editBookmark={editBookmark}/>
      <BookmarkList
        bookmarks={bookmarks}
        deleteBookmark={deleteBookmark}
        setEditBookmark={setEditBookmark}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
