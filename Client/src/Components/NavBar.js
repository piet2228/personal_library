import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { auth } from "../firebase-config";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function NavBar() {
  const [userState, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);
  return (
    <Navbar sticky="top" className="bg-body-tertiary px-3">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/search">Search</Nav.Link>
          <Nav.Link href="/my-books">My Books</Nav.Link>
        </Nav>
        <Navbar.Text>
          <a href="/login">{userState ? "Log out" : "Sign in"}</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
