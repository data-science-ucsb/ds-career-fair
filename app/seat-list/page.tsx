"use client";

// TODO: check for auth, migrate to firebase functions
import { app, db } from "@/app/config"

import { collection } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';

export default function SeatList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [snapshot, loading, error] = useCollection(query, options);
  const [snapshot, loading, error] = useCollection(
    collection(db, 'companies')
  );

  const createUser = async (data: Object) => {
    console.log(data)
  }

  if (loading) return <h1>Loading...</h1>

  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <main>
      <form onSubmit={handleSubmit((data) => createUser(data))}>
        <input {...register("firstName", { required: true })} />
        <input {...register("lastName", { required: true })} />
        <input {...register("email", { required: true })} />
        <input type="submit" />
      </form>
    </main>
  );

}
