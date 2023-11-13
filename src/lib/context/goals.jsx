import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";

export const GOALS_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE;
export const GOALS_COLLECTION_ID = "<YOUR_COLLECTION_ID>"; // Replace with your collection ID

const GoalsContext = createContext();

export function useGoals() {
  return useContext(GoalsContext);
}

export function GoalsProvider(props) {
  const [goals, setGoals] = useState([]);

  async function add(goal) {
    const response = await databases.createDocument(
      GOALS_DATABASE_ID,
      GOALS_COLLECTION_ID,
      ID.unique(),
      goal
    );
    setGoals((goals) => [response.$id, ...goals].slice(0, 10));
  }

  async function remove(id) {
    await databases.deleteDocument(GOALS_DATABASE_ID, GOALS_COLLECTION_ID, id);
    setGoals((goals) => goals.filter((goal) => goal.$id !== id));
    await init(); // Refetch goals to ensure we have 10 items
  }

  async function init() {
    const response = await databases.listDocuments(
      GOALS_DATABASE_ID,
      GOALS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );
    setGoals(response.documents);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <GoalsContext.Provider value={{ current: goals, add, remove }}>
      {props.children}
    </GoalsContext.Provider>
  );
}
