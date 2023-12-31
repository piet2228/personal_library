import { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import BookThumbNail from "./BookThumbNail";
import baseUrl from "../apis/LibraryApi";

export default function MyBooks() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchOptions = {
    method: "POST",
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
        fetch(`${baseUrl}/Collection/${uid}`)
          .then((response) => {
            return response.json();
          })
          .then((d) => {
            setData(d);
            console.log(d);
          })
          .then(() => {
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <>
      <div className="flexbox-grid container">
        {user == null && <p>Please Sign In to save books to your library</p>}
        {data &&
          Object.keys(data).length > 0 &&
          data.map((book) => {
            return (
              <BookThumbNail
                imageSrc={book.thumbnail}
                title={book.title}
                author={book.author}
                link={`book/?bookId=${book.volume_id}`}
                pubDate={book.published_date}
              />
            );
          })}
      </div>
    </>
  );
}
