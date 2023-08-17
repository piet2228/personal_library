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
import NavBar from "./Components/NavBar";
import AccountPage from "./Components/AccountPage";
import MyBooks from "./Components/MyBooks";

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path="/book" element={<BookInfo />} />
          <Route path="/login" element={<AccountPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/my-books" element={<MyBooks />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
