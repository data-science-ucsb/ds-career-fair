"use client";

import { useForm } from "react-hook-form";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/config";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import LoginButton from "@/components/LoginButton";
import FormInput from "@/components/FormInput";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error: {error.message}</h1>;

  if (user) {
    return (
      <main>
        <h1>Welcome, {user.displayName}</h1>
        <h2>Let&apos;s find your next job</h2>
        <form onSubmit={handleSubmit((data) => {
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            name: data.name,
            description: data.description,
            location: data.location,
          });
        })}>
          <FormInput
            name="name"
            label="company's name"
            errors={errors}
            register={register}
          />
          <FormInput
            name="description"
            label="company's description"
            errors={errors}
            register={register}
          />
          <FormInput
            name="location"
            label="company's headquarters (e.g., Redwood City, CA)"
            errors={errors}
            register={register}
            additionalOptions={{ pattern: /^[ A-Za-z]+, [A-Z]{2}$/ }}
          />
          <input type="submit" />
        </form>
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
