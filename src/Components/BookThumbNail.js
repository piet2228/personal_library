import { Card } from "react-bootstrap";
export default function BookThumbNail({imageSrc, title, author, pubDate, link}) {
  const myStyle = {
    width: '13rem',
    margin: '1rem'
  }
  return (
/*     <button className="flexbox-container" onClick={() => console.log("hi")}> 
      <img src={imageSrc}/>
      <div>      
        <h1>{title}</h1>
        <p>{`${author} - ${pubDate}`}</p>
      </div> 

    </button> */

    <a href={link} style={myStyle} >
      <Card>
        <Card.Img variant="top" src={imageSrc} alt={"No image found"} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{`${author} - ${pubDate}`}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
}

