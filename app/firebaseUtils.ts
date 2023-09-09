import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "./config";

export function useDoc(pathOrRef, isPending) {
  let ref;
  if (typeof pathOrRef === "string") {
    ref = doc(db, pathOrRef);
  } else {
    ref = pathOrRef;
  }
  const [data] = useDocumentData(ref);
  return [data || {}, (ref && !data) || isPending];
}
