import "./App.css";
import SearchBar from "./Components/SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import BookGrid from "./Components/BookGrid";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./Components/Search";
import BookInfo from "./Components/BookInfo";
import { Button } from "react-bootstrap";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path="/book" element={<BookInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
