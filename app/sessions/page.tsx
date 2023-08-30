"use client";

import { app, db, auth } from "@/app/config"

import { useAuthState } from "react-firebase-hooks/auth";

import { collection, doc, addDoc, deleteDoc, updateDoc, Timestamp } from 'firebase/firestore';
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
  const [ sessionsData, loadingSessions ] = getFromCollection(repsRef, ['company', '==', company]) // TODO: UPDATE THIS, ADD HELPER

  const loading = loadingUser || (user && loadingCompany) || loadingSessions

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addSession = async (data: Object) => {
    await addDoc(collection(db, 'companies', company, 'sessions'), {
      capacity: data.capacity,
      startTime: data.startTime,
      endTime: data.endTime,
      isGroupSession: data.isGroupSession,
      isSingleEvent: data.isSingleEvent,
      name: data.name
    })

    alert(`New session at ${data.startTime} created successfully`)
  }

  const deleteSession = async (sessionId, sessionName) => {
    await deleteDoc(doc(db, 'companies', company, 'sessions', sessionId))

    alert(`Session ${sessionName} deleted successfully`)
  }

  const updateSession = async (sessionId, sessionName, newData) => {
    const sessionRef = doc(db, 'companies', company, 'sessions', sessionId)
    await updateDoc(sessionRef, newData)

    alert(`User ${sessionName} status updated successfully`)
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
          repsData && repsData.docs.length > 0 && (
            repsData.docs.map((item, id) => {
              return (
                <li key={id}>
                  {item.data().name} ({item.data().status})  |
                  <button onClick={() => updateRep(item.id, item.data().status, item.data().name)}>change status to {getOppositeStatus(item.data().status)}</button> |
                  <button onClick={() => deleteRep(item.id, item.data().name)}>delete</button>
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
