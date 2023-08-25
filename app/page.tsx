"use client";

import { useForm } from "react-hook-form";

import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, db } from "@/app/config";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import LoginButton from "@/components/LoginButton";
import FormInput from "@/components/FormInput";
import { useEffect } from "react";

import { CldUploadButton } from "next-cloudinary";

function useDoc(pathOrRef) {
  let ref;
  if (!pathOrRef) {
    ref = null;
  } else if (typeof pathOrRef === "string") {
    ref = doc(db, pathOrRef);
  } else {
    ref = pathOrRef;
  }
  const [data, loading] = useDocumentData(ref);
  return [data || {}, loading];
}

export default function Home() {
  const [user, loadingUser, error] = useAuthState(auth);

  const [{ company }, loadingRep] = useDoc(user && `reps/${user.uid}`);

  const companyRef = company && doc(db, `companies/${company}`);

  const [companyData, loadingCompany] = useDoc(companyRef);

  const loading = loadingUser || loadingRep || loadingCompany;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset(companyData);
  }, [loading]);

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error: {error.message}</h1>;

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
