import SearchBar from './SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookGrid from './BookGrid';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useSearchParams} from 'react-router-dom';

export default function() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [queryParams] = useSearchParams();
  const search = () => {
    if (queryParams.get("search_bar") != null){
      setLoading(true);
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${queryParams.get("search_bar")}&maxResults=40`
      )
        .then((response) => {return response.json()})
        .then((d) => {
          setData({d});
        })
        .then(() => {
          setLoading(false);
        })
        .catch(setError);
      }
    }
  useEffect(search, [])
  if (loading) {
    return (
      <>
        <SearchBar onSubmit={() =>search()}/>
        <p>Loading</p>
      </>
    );
  }
  else if (error) {
    return (
      <>
        <SearchBar onSubmit={() =>search()}/>
        <pre>JSON.stringify(error)</pre>
      </>
    )
  }
  return (
    <>
      <SearchBar onSubmit={() =>search()}/>
      <BookGrid books={data}/>
      <nav aria-label="Book search result pages">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#">Previous</a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
      <p>{JSON.stringify(data)}</p>


    </>
  );
}