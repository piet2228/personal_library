import { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import BookThumbNail from "./BookThumbNail";

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
        console.log(
          `http://${process.env.REACT_APP_SERVERHOST}:${process.env.REACT_APP_SERVERPORT}/Collection/${uid}`
        );
        fetch(
          `http://${process.env.REACT_APP_SERVERHOST}:${process.env.REACT_APP_SERVERPORT}/Collection/${uid}`
        )
          .then((response) => {
            console.log(`fetching ${response}`);
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
        // User is signed out
        console.log("user is logged out");
      }
    });
  }, []);
  return (
    <>
      <div className="flexbox-grid container">
        {user == null && <p>Please Sign In to save books to your library</p>}
        {data &&
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
