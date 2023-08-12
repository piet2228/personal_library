import { useEffect, useState } from "react";
import Login from "./Login";
import { Button, Container } from "react-bootstrap";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
export default function AccountPage() {
  const [userState, setUser] = useState(null);
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        alert("You are now logged out");
        window.location.reload(false);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid);
        setUser(user);
      } else {
        // User is signed out
        console.log("user is logged out");
      }
    });
  }, []);
  if (userState == null) {
    return <Login />;
  } else {
    return (
      <Container className="mt-1">
        <h1>{userState.email}</h1>
        <h2>{userState.uid}</h2>
        <Button onClick={handleLogOut}>Log Out</Button>
      </Container>
    );
  }
}
