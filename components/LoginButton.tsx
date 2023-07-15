"use client";

import { GoogleLoginButton } from "react-social-login-buttons";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "@/app/config";

const provider = new GoogleAuthProvider();

export default function LoginButton() {
  return (
    <GoogleLoginButton
      onClick={() => {
        signInWithRedirect(auth, provider);
      }}
    />
  );
}
