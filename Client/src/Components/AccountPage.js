import { useEffect, useState } from "react";
import Login from "./Login";
import { Button, Container } from "react-bootstrap";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
export default function AccountPage() {
  const [userState, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);
  if (loading) {
    return (
      <Container className="mt-1">
        <p>Getting Account Info</p>
      </Container>
    );
  } else if (userState == null) {
    return (
      <Container className="mt-1">
        <Login />
      </Container>
    );
  } else {
    return (
      <Container className="mt-1">
        <h2>You are currently logged in as:</h2>
        <h2>{userState.email}</h2>
        <Button onClick={handleLogOut}>Log Out</Button>
      </Container>
    );
  }
}
