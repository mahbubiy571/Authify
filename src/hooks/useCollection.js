import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollection = (collectionName, orderByTimestamp = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collectionName) return;

    setLoading(true);
    setError(null);

    let q;
    if (orderByTimestamp) {
      q = query(collection(db, collectionName), orderBy("timestamp", "asc"));
    } else {
      q = collection(db, collectionName);
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));
        setData(newData);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error:", err);
        setError("Failed to fetch data 😔");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, orderByTimestamp]);

  return { data, loading, error };
};
