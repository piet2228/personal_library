import './App.css';
import SearchBar from './Components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookGrid from './Components/BookGrid';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useSearchParams} from 'react-router-dom';
import Search from './Components/Search';
import BookInfo from './Components/BookInfo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search/>}/>
        <Route path="/book" element={<BookInfo />}/>
      </Routes>
    </BrowserRouter>
  )
}


export default App;
