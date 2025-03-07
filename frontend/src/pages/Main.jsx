import React, { useEffect, useState, useRef } from "react";
import useApi from "../hooks/useApi";

const Main = () => {
  const { getRequest, loading, error } = useApi();
  const [books, setBooks] = useState([]);

  // Use useRef to store the getRequest function so it doesn't trigger useEffect on every render
  const getRequestRef = useRef(getRequest);

  useEffect(() => {
    // Initialize getRequestRef.current to avoid unnecessary re-renders
    getRequestRef.current = getRequest;
  }, [getRequest]);

  // Fetch books when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Only fetch data if we haven't fetched it yet
        const data = await getRequestRef.current("/books"); // Replace with your backend endpoint to get the books
        setBooks(data); // Assuming the data returned is an array of books
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <h1>Book List</h1>

      {loading && <p>Loading books...</p>}
      {error && <p>Error: {error}</p>}

      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              {" "}
              {/* Assuming each book has a unique id */}
              <strong>Title:</strong> {book.title} <br />
              <strong>Author:</strong> {book.author}
            </li>
          ))}
        </ul>
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default Main;
