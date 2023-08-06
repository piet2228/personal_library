import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"

export default function BookInfo() {
  function removeHTMLTags(input) {
    return input.replace(/<[^>]+>/g, '');
  }
  const [queryParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchBook = () => {
    console.log(queryParams.get("bookId"));
    setLoading(true);
    fetch(`https://www.googleapis.com/books/v1/volumes/${queryParams.get("bookId")}`)
    .then(response => {return response.json()})
    .then((d) => {
      setData(d);
      setLoading(false);
      console.log(d);
    })
    .catch(setError)
  }
  useEffect(fetchBook, []);
  if(loading){
    return <p>Loading...</p>
  }
  else if (error){
    return <pre>{JSON.stringify(error)}</pre>
  }
  if(!data){
    return <p>Loading...</p>
  }
  return(
    <div className="container">
      <img 
        src={data.volumeInfo.imageLinks.thumbnail} 
        alt={data.volumeInfo.title + "cover image"}
        style={{float:"right"}}/>    
      <h1>{data.volumeInfo.title}</h1>

      <h3>By:</h3>
      {data.volumeInfo.authors && data.volumeInfo.authors.map( (author) => <p>{author}</p>)}
      <h3>Description:</h3>
      <p>{removeHTMLTags(data.volumeInfo.description)}</p>
    </div>
  )
}