import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollection = (CollectionName) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, CollectionName),
      (snapshot) => {
        const data = [];
        snapshot.forEach((item) => {
          data.push({
            uid: item.id,
            ...item.data(),
          });
        });

        setData(data);
      }
    );

    return () => unsubscribe();
  }, [CollectionName]);

  return { data };
};
