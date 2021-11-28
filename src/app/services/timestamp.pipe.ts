import {Pipe, PipeTransform} from "@angular/core";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(value: Timestamp, ...args: never): Date {
    return value.toDate();
  }

}
