import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { auth } from "../firebase-config";

function removeHTMLTags(input) {
  return input.replace(/<[^>]+>/g, "");
}
export default function BookInfo() {
  const [queryParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [inCollection, setInCollection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const bookId = queryParams.get("bookId");
  const fetchBook = () => {
    setLoading(true);
    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      .then((response) => {
        return response.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(setError);
  };
  const getUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };
  const checkBook = () => {
    if (user == null) {
      return;
    }
    fetch(
      `http://${process.env.REACT_APP_SERVERHOST}:${process.env.REACT_APP_SERVERPORT}/Collection/${user.uid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((d) => {
        const matches = d.filter((book) => book.volume_id == bookId);
        if (matches.length > 0) {
          setInCollection(true);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message());
      });
  };
  const addBook = async () => {
    let bodyContent = JSON.stringify({
      volume_id: bookId,
      title: `${data.volumeInfo.title ? data.volumeInfo.title : "N/A"}`,
      author: `${data.volumeInfo.authors ? data.volumeInfo.authors[0] : "N/A"}`,
      thumbnail: data.volumeInfo.imageLinks.thumbnail,
      published_date: `${
        data.volumeInfo.publishedDate ? data.volumeInfo.publishedDate : "N/A"
      }`,
    });
    fetch(
      `http://${process.env.REACT_APP_SERVERHOST}:${process.env.REACT_APP_SERVERPORT}/books`,
      {
        method: "POST",
        body: bodyContent,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => {
        registerBook();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
  const registerBook = () => {
    let bodyContent = JSON.stringify({
      user_id: user.uid,
      volume_id: bookId,
    });
    fetch(
      `http://${process.env.REACT_APP_SERVERHOST}:${process.env.REACT_APP_SERVERPORT}/Collection`,
      {
        method: "POST",
        body: bodyContent,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => {
        setInCollection(true);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message());
      });
  };
  const deregisterBook = () => {
    let bodyContent = JSON.stringify({
      user_id: user.uid,
      volume_id: bookId,
    });
    fetch(
      `http://${process.env.REACT_APP_SERVERHOST}:${process.env.REACT_APP_SERVERPORT}/Collection`,
      {
        method: "DELETE",
        body: bodyContent,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        setInCollection(false);
        return response.json();
      })
      .then((d) => {})
      .catch((err) => {
        console.log(err);
        alert(err.message());
      });
  };
  useEffect(fetchBook, []);
  useEffect(getUser, []);
  useEffect(checkBook, [user]);
  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }
  if (!data) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container">
      <img
        src={data.volumeInfo.imageLinks.thumbnail}
        alt={data.volumeInfo.title + "cover image"}
        style={{ float: "right" }}
      />
      <h3 className="display-3">{data.volumeInfo.title}</h3>

      <h4>Authors:</h4>
      {data.volumeInfo.authors &&
        data.volumeInfo.authors.map((author) => <p>{author}</p>)}
      <h4>Published by</h4>
      <p>{data.volumeInfo.publisher}</p>
      <h4>Released on</h4>
      {data.volumeInfo.publishedDate}
      <h4>Description:</h4>
      {data.volumeInfo.description && (
        <p>{removeHTMLTags(data.volumeInfo.description)}</p>
      )}
      <h4>Identifiers</h4>
      {data.volumeInfo.industryIdentifiers &&
        data.volumeInfo.industryIdentifiers.map((id) => {
          return (
            <p>
              {id.type}: {id.identifier}
            </p>
          );
        })}

      {user && !inCollection && (
        <button
          type="button"
          class="btn btn-primary btn-lg"
          onClick={(event) => {
            if (user == null) {
              alert("Please login to save books");
              return;
            }
            event.preventDefault();
            addBook();
          }}
        >
          Add to library
        </button>
      )}
      {user && inCollection && (
        <button
          type="button"
          class="btn btn-secondary btn-lg"
          onClick={(event) => {
            event.preventDefault();
            deregisterBook();
          }}
        >
          Remove from Library
        </button>
      )}
    </div>
  );
}
