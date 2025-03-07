import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from "./pages/Main";
import AddBook from "./pages/AddBook";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/add" element={<AddBook />} />
      </Routes>
    </Router>
  );
};

export default App;
