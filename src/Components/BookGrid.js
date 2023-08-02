import BookThumbNail from "./BookThumbNail";

export default function CardGrid({books}) {
  console.log(`${JSON.stringify(books)} and ${"hi"}`); 
  if (books !== null && books.d.items !== undefined && books.d.items !== null){
    return (
      <div className="flexbox-grid">
        {books.d.items.map( (book) => {
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