import {MatTableDataSource} from "@angular/material/table";
import {Measurement} from "../types";
import {Observable, ReplaySubject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class CommunicationService {

  private channel = new ReplaySubject<MatTableDataSource<Measurement>>(1);

  public send(dataSource: MatTableDataSource<Measurement>) {
    this.channel.next(dataSource);
    this.channel.complete();
  }

  public receive(): Observable<MatTableDataSource<Measurement>> {
    return this.channel.asObservable();
  }

}
