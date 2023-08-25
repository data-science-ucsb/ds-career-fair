import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
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
