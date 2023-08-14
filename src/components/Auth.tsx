import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInput =
    (setterFn: Function) =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setterFn(value);
    };

  const signIn = () => {
    try {
      createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = () => {
    try {
      signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    try {
      signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Email..."
        onChange={handleInput(setEmail)}
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={handleInput(setPassword)}
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Auth;
