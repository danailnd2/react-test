import React, { useState } from "react";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // for navigation
import useApi from "../hooks/useApi";
import "../styles/AddBook.css";

const AddBook = () => {
  const { postRequest, loading, error } = useApi();
  const navigate = useNavigate();

  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPages, setBookPages] = useState("");
  const [bookHasPictures, setBookHasPictures] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBook = {
      title: bookName,
      author: bookAuthor,
      pageDetails: {
        numberOfPages: bookPages,
        hasPicture: bookHasPictures,
      },
    };

    try {
      // Send POST request to add the book
      await postRequest("/books", newBook);
      console.log("Book added successfully");

      // Reset form values
      setBookName("");
      setBookAuthor("");
      setBookPages("");
      setBookHasPictures(false);

      // Navigate to the main page
      navigate("/");
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="add-book-form">
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Add a Book
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Book Name"
              variant="filled"
              fullWidth
              margin="normal"
              required
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
            <TextField
              label="Author"
              variant="filled"
              fullWidth
              margin="normal"
              required
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
            />
            <TextField
              label="Number of Pages"
              variant="filled"
              fullWidth
              margin="normal"
              type="number"
              required
              value={bookPages}
              onChange={(e) => setBookPages(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={bookHasPictures}
                  onChange={(e) => setBookHasPictures(e.target.checked)}
                  name="bookHasPictures"
                  color="primary"
                />
              }
              label="Has Pictures"
            />
            <div className="buttons">
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleGoBack}
              >
                Go Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading} // Disable submit when loading
              >
                {loading ? "Adding..." : "Add Book"}
              </Button>
            </div>
            {error && <Typography color="error">{error}</Typography>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBook;
