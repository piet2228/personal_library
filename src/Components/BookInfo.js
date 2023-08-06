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
    setLoading(true);
    fetch(`https://www.googleapis.com/books/v1/volumes/${queryParams.get("bookId")}`)
    .then(response => {return response.json()})
    .then((d) => {
      setData(d);
      setLoading(false);
    })
    .catch(setError)
  }
  useEffect(fetchBook, []);
  /*
  const getBestImage = () => {
    let images = Object.values(data.volumeInfo.imageLinks);
    console.log(images)
    return images[images.length-1];
  }*/
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
      <h1 className="display-1">{data.volumeInfo.title}</h1>

      <h4>Authors:</h4>
      {data.volumeInfo.authors && data.volumeInfo.authors.map( (author) => <p>{author}</p>)}
      <h4>Published by</h4>
      <p>{data.volumeInfo.publisher}</p>
      <h4>Released on</h4>
      {data.volumeInfo.publishedDate}
      <h4>Description:</h4>
      <p>{removeHTMLTags(data.volumeInfo.description)}</p>
      <h4>Identifiers</h4>
      {data.volumeInfo.industryIdentifiers.map( 
        (id) => {
        return (<p>{id.type}: {id.identifier}</p>);
      })}
      <button type="button" class="btn btn-primary btn-lg">Add to library</button>    </div>
  )
}