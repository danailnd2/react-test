import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import AddBook from "./pages/AddBook";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/add" element={<AddBook />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
