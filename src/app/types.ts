import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface Measurement {
  humidity: number,
  temperature: number,
  time: Timestamp
}
