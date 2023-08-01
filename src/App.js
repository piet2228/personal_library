import { Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import './App.css';
import BookThumbNail from './Components/BookThumbNail';
import SearchBar from './Components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookGrid from './Components/BookGrid';
import { useEffect, useState } from 'react';


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const search = () => {
    console.log('searchign')
    setLoading(true);
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=percy+jackson&maxResults=40`
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


  return (
    <>
      <SearchBar onSubmit={() =>search()}/>
      {loading && <p>Loading</p>} 
      {(data && !loading) && <BookGrid books={data}/>}
      <p>{JSON.stringify(data)}</p>

    </>
  );
}

export default App;
