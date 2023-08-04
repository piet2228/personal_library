import { useState, useEffect } from "react";
import BookThumbNail from "./BookThumbNail";
import { useSearchParams } from "react-router-dom";

export default function BookGrid() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [queryParams] = useSearchParams();
  const [pageNum, setPageNum] = useState(0);
  const maxResults = 40;
  const search = () => {
    if (queryParams.get("search_bar") != null){
      setLoading(true);
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=`
        +`${queryParams.get("search_bar")}`
        +`&startIndex=${0}`
        +`&maxResults=${maxResults}`
        +`&orderBy=relevance`
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
  const fetchMoreData = () => {
    if (queryParams.get("search_bar") != null){
      setLoading(true);
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=`
        +`${queryParams.get("search_bar")}`
        +`&startIndex=${pageNum * maxResults}`
        +`&maxResults=${maxResults}`
        +`&orderBy=relevance`
      )
        .then((response) => {return response.json()})
        .then((d) => {
          let newData = Object.assign(data);
          newData.d.items.push(d.d.items)
          setData(newData);
          setPageNum(pageNum+1);
        })
        .then(() => {
          setLoading(false);
        })
        .catch(setError);
    }
  }
  useEffect(search, []);
  if (loading){
    return <p>Loading...</p>
  }
  if (error){
    return <pre>JSON.stringify(error)</pre>
  }
  if (data !== null && data.d.items !== undefined && data.d.items !== null){
    return (
      <div className="flexbox-grid">
        {data.d.items.map( (book) => {
          return(
            <BookThumbNail 
              imageSrc={
                book.volumeInfo.imageLinks ?
                book.volumeInfo.imageLinks.thumbnail:
                null
              } 
              title={book.volumeInfo.title ?
                book.volumeInfo.title:
                'N/A'
              } 
              author={
                book.volumeInfo.authors ?
                book.volumeInfo.authors[0]:
                'N/A'
              }
              pubDate={book.volumeInfo.publishedDate}
              link={book.volumeInfo.infoLink}
              />
          );
        })}
      </div>
    );
  }
  return <p>No items found</p>
}