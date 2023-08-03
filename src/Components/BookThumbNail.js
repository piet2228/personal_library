import { Card } from "react-bootstrap";
export default function BookThumbNail({imageSrc, title, author, pubDate, link}) {
  const myStyle = {
    width: '13rem',
    height: 'auto',
    margin: '1rem'
  }
  return (
    <a href={link} style={myStyle}>
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

