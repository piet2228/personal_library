import { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function MyBooks() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchOptions = {
    method: "POST",
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
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
      <p>TEST</p>
      <p>{`${process.env.REACT_APP_SERVERHOST}:${process.env.REACT_APP_SERVERPORT}`}</p>
      <p>{JSON.stringify(data)}</p>
      <p>{loading}</p>
      <p>{JSON.stringify(error)}</p>
    </>
  );
}
