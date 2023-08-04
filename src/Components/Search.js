import SearchBar from './SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookGrid from './BookGrid';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useSearchParams} from 'react-router-dom';

export default function() {

  return (
    <>
      <SearchBar/>
      <BookGrid/>
    </>
  );
}