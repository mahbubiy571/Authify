import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollection = (CollectionName) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const unsubscribe = onSnapshot(
        collection(db, CollectionName),
        (snapshot) => {
          const newData = [];
          snapshot.forEach((item) => {
            newData.push({
              uid: item.id,
              ...item.data(),
            });
          });

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
    } catch (err) {
      setError("Something went wrong 😥");
      setLoading(false);
    }
  }, [CollectionName]);

  return { data, loading, error };
};
