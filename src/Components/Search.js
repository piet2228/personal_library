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
        `https://www.googleapis.com/books/v1/volumes?q=${queryParams.get("search_bar")}&startIndex=${(queryParams.get("page")-1) * 40}&maxResults=40&orderBy=relevance`
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
      <p>{JSON.stringify(data)}</p>

    </>
  );
}