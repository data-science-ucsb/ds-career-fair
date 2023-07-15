"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import LoginButton from "@/components/LoginButton";

import { auth } from "@/app/config";
import { signOut } from "firebase/auth";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error: {error.message}</h1>;

  if (user) {
    return (
      <main>
        <h1>Welcome, {user.displayName}</h1>
        <h2>Let&apos;s find your next job</h2>
        <button onClick={() => signOut(auth)}>Sign Out</button>
      </main>
    );
  }

  return (
    <main>
      <h1>Data Science UCSB - Career Fair</h1>
      <h2>Let&apos;s find your next job</h2>
      <LoginButton />
    </main>
  );
}
