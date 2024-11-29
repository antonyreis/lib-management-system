// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import User from "./pages/User";
import Book from "./pages/Book";
import Loan from "./pages/Loan";

function App() {
  // const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  // console.log({isAuthenticated})

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/menu" element= {<Menu />} />

        <Route path="/user" element= {<User />} />

        <Route path="/book" element= {<Book />} />

        <Route path="/loan" element= {<Loan />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
