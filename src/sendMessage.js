
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export const sendMessage = async (senderId, receiverId, text) => {
  await addDoc(collection(db, "messages"), {
    senderId,
    receiverId,
    text,
    timestamp: serverTimestamp()
  });
};
