import './App.css';
import SearchBar from './Components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookGrid from './Components/BookGrid';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useSearchParams} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}
function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [queryParams] = useSearchParams();
  const search = () => {
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
  useEffect(search, [])

  return (
    <>
      <SearchBar onSubmit={() =>search()}/>
      {loading && <p>Loading</p>} 
      {(data && !loading) && <BookGrid books={data}/>}
      {error && <p>Error</p>}
      <p>{JSON.stringify(data)}</p>

    </>
  );
}

export default App;
