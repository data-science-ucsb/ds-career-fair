"use client";

// TODO: check for auth, migrate to firebase functions
import { app, db } from "@/app/config"

import { collection } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function SeatList() {
  let [ userCompany ] = useState({
    name: 'Loading...',
    location: 'Loading...',
    description: 'Loading...',
    imagePublicId: 'Loading...'
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [snapshot, loading, error] = useCollection(query, options);
  const [snapshot, loading, error] = useCollection(
    collection(db, 'companies')
  );

  const addRep = async (data: Object) => { } // TODO; export to firebase function

  if (loading) return <h1>Loading...</h1>

  if (error) return <h1>Error: {error.message}</h1>;

  if (snapshot) {
    let data = snapshot.docs[0].data() // TODO: load the user's actual company
    userCompany = {
      name: data.name,
      location: data.location,
      description: data.description,
      imagePublicId: data.imagePublicId
    }
  }

  return (

    <main>
      <h1>{ userCompany.name }</h1>
      <h1>{ userCompany.location }</h1>

      <form onSubmit={handleSubmit((data) => addRep(data))}>
        <input {...register("firstName", { required: true })} />
        <input {...register("lastName", { required: true })} />
        <input {...register("email", { required: true })} />
        <input type="submit" />
      </form>

    </main>
  );

}
