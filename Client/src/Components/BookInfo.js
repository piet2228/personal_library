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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const fetchBook = () => {
    setLoading(true);
    fetch(
      `https://www.googleapis.com/books/v1/volumes/${queryParams.get("bookId")}`
    )
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
        console.log("uid", uid);
        setUser(user);
      } else {
        console.log("user is logged out");
      }
    });
  };
  const addBook = async () => {
    let bodyContent = JSON.stringify({
      volume_id: queryParams.get("bookId"),
      title: `${data.volumeInfo.title ? data.volumeInfo.title : "N/A"}`,
      author: `${data.volumeInfo.authors ? data.volumeInfo.authors[0] : "N/A"}`,
      thumbnail: data.volumeInfo.imageLinks.thumbnail,
    });
    console.log(bodyContent);
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
        console.log("post confirmed");
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
      volume_id: queryParams.get("bookId"),
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
    ).catch((err) => {
      console.log(err);
      alert(err.message());
    });
  };
  useEffect(fetchBook, []);
  useEffect(getUser, []);
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
      {user && (
        <button
          type="button"
          class="btn btn-primary btn-lg"
          onClick={(event) => {
            event.preventDefault();
            addBook();
          }}
        >
          Add to library
        </button>
      )}
    </div>
  );
}
