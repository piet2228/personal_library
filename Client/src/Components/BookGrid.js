import { useState, useEffect } from "react";
import BookThumbNail from "./BookThumbNail";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export default function BookGrid() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [queryParams] = useSearchParams();
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const maxResults = 10;
  const search = () => {
    if (queryParams.get("search_bar") != null) {
      setLoading(true);
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=` +
          `${queryParams.get("search_bar")}` +
          `&startIndex=${0}` +
          `&maxResults=${maxResults}` +
          `&orderBy=relevance`
      )
        .then((response) => {
          return response.json();
        })
        .then((d) => {
          setData({ d });
          setPageNum(pageNum + 1);
        })
        .then(() => {
          setLoading(false);
        })
        .catch(setError);
    }
  };
  const fetchMoreData = () => {
    if (queryParams.get("search_bar") != null) {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=` +
          `${queryParams.get("search_bar")}` +
          `&startIndex=${pageNum * maxResults}` +
          `&maxResults=${maxResults}` +
          `&orderBy=relevance`
      )
        .then((response) => {
          return response.json();
        })
        .then((d) => {
          if (d.items === undefined) {
            setHasMore(false);
          } else {
            let newData = Object.assign(data);
            newData.d.items = newData.d.items.concat(d.items);
            setData(newData);
            setPageNum(pageNum + 1);
          }
        })
        .catch(setError);
    }
  };
  useEffect(search, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log(error);
    return <pre>JSON.stringify(error)</pre>;
  }
  if (data !== null && data.d.items !== undefined && data.d.items !== null) {
    return (
      <InfiniteScroll
        className="flexbox-grid"
        dataLength={data.d.items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h2>Loading...</h2>}
      >
        {data.d.items.map((book) => {
          return (
            <BookThumbNail
              imageSrc={
                book.volumeInfo.imageLinks
                  ? book.volumeInfo.imageLinks.thumbnail
                  : null
              }
              title={book.volumeInfo.title ? book.volumeInfo.title : "N/A"}
              author={
                book.volumeInfo.authors ? book.volumeInfo.authors[0] : "N/A"
              }
              pubDate={book.volumeInfo.publishedDate}
              link={`/book/?bookId=${book.id}`}
            />
          );
        })}
      </InfiniteScroll>
    );
  }
  return <p>No items found</p>;
}
