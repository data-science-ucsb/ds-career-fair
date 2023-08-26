import { doc } from "firebase/firestore";
import { useDocumentData, useCollectionData } from "react-firebase-hooks/firestore";
import { query, where } from 'firebase/firestore';
import { db } from "./config";

export function useDoc(pathOrRef) {
  let ref;
  if (typeof pathOrRef === "string") {
    ref = doc(db, pathOrRef);
  } else {
    ref = pathOrRef;
  }
  const [data, loading] = useDocumentData(ref);
  return [data || {}, loading || !data];
}

export function getFromCollection(pathOrRef, collectionQuery) {
  let ref = (typeof pathOrRef === "string") ? query(collection(db, pathOrRef), where(...collectionQuery)) : pathOrRef;
  const [data, loading] = useCollectionData(ref)
  return [data || {}, loading || !data]
}
