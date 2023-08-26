"use client";

// TODO: check for auth, migrate to firebase functions
import { app, db, auth } from "@/app/config"

import { useAuthState } from "react-firebase-hooks/auth";

import { collection, doc, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore';

import { useDoc, getFromCollection } from '@/app/firebaseUtils'

import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function SeatList() {
  const [user, loadingUser, error] = useAuthState(auth);

  const [{ company }] = useDoc(user && `reps/${user.uid}`)
  const companyRef = company && doc(db, `companies/${company}`)
  const [ companyData, loadingCompany ] = useDoc(companyRef)
  const repsRef = company && collection(db, `reps`)
  const [ repsData, loadingReps ] = getFromCollection(repsRef, ['company', '==', company])

  const loading = loadingUser || (user && loadingCompany) || loadingReps

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addRep = async (data: Object) => {
    const date = new Date();
    date.setDate(date.getDate() + 7);

    const newInviteRef = await addDoc(collection(db, 'companies', company, 'invites'), {
      firstName: data.firstName, // TODO: refactor into type
      lastName: data.lastName,
      email: data.email,
      expiresOn: Timestamp.fromDate(date)
    })

    alert(`New invite to ${data.email} sent successfully`)
  }
  

  if (loading) return <h1>Loading...</h1>

  if (error) return <h1>Error: {error.message}</h1>;

  return (

    <main>
      <h1>{ companyData.name }</h1>
      <h1>{ companyData.location }</h1>

      <h2>Representatives:</h2>
      <ol>
        {
          repsData && repsData.length > 0 && (
            repsData.map((item, id) => {
              return (
                <li key={id}>
                  <p>{item.name}</p> 
                </li>
              )
            })
          )
        }
      </ol>

      <h2>Invite a new user</h2>
      <form onSubmit={handleSubmit((data) => addRep(data))}>
        <input {...register("firstName", { required: true })} />
        <input {...register("lastName", { required: true })} />
        <input {...register("email", { required: true })} />
        <input type="submit" />
      </form>

    </main>
  );

}
