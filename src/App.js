import './App.css';
import SearchBar from './Components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookGrid from './Components/BookGrid';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useSearchParams} from 'react-router-dom';
import Search from './Components/Search';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search/>}/>
      </Routes>
    </BrowserRouter>
  )
}


export default App;
