"use client";

import { GoogleLoginButton } from "react-social-login-buttons";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "./config";

const provider = new GoogleAuthProvider();

export const LoginButton = () => {
  return (
    <GoogleLoginButton
      onClick={() => {
        signInWithRedirect(auth, provider);
      }}
    />
  );
};

export default function Home() {
  return (
    <main>
      <h1>Data Science UCSB - Career Fair</h1>
      <h2>Let&apos;s find your next job</h2>
      <LoginButton />
    </main>
  );
}
