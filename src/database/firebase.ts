import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { FIREBASE_PROJECT_ID } from "../constants";

const firebaseClient = initializeApp({
  projectId: FIREBASE_PROJECT_ID,
  databaseURL: "https://hacker-news.firebaseio.com",
});

const database = getDatabase(firebaseClient);

export { firebaseClient, database };
