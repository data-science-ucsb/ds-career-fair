"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/config";

import { doc, updateDoc } from "firebase/firestore";
import { useDoc } from "@/app/firebaseUtils";

import LoginButton from "@/components/LoginButton";
import FormInput from "@/components/FormInput";

import { CldUploadButton } from "next-cloudinary";

export default function Home() {
  const [user, loadingUser] = useAuthState(auth);

  const [{ company }, loadingRep] = useDoc(
    user && `reps/${user.uid}`,
    loadingUser
  );

  const companyRef = company && doc(db, `companies/${company}`);

  const [companyData, loadingCompany] = useDoc(companyRef, loadingRep);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset(companyData);
  }, [loadingCompany]);

  if (loadingCompany) return <h1>Loading...</h1>;

  if (user) {
    return (
      <main>
        <h1>Welcome, {user.displayName}</h1>
        <h2>Let&apos;s find your next job</h2>
        <CldUploadButton uploadPreset="companies_unsigned" />
        <form
          onSubmit={handleSubmit((data) => {
            updateDoc(companyRef, {
              name: data.name,
              description: data.description,
              location: data.location,
            });
          })}
        >
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
