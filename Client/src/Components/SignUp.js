import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="container center-container">
      <form>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn btn-primary" onClick={onSubmit}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
