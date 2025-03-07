import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import BookTable from "../components/BookTable"; // Import the BookTable component
import { IconButton } from "@mui/material";
import { AddCircle as AddCircleIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Main = () => {
  const { getRequest, loading, error } = useApi();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getRequest("/books");
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div
      style={{
        width: "700px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1>Book List</h1>

      {loading && <p>Loading books...</p>}
      {error && <p>Error: {error}</p>}

      {books.length > 0 ? (
        <BookTable books={books} />
      ) : (
        <p>No books available</p>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <IconButton component={Link} to="/add" color="primary">
          <AddCircleIcon style={{ fontSize: "40px" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Main;
