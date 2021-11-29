import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Measurement} from "../../types";
import {map} from "rxjs/operators";
import firebase from "firebase/compat";

import {Subscription} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {CommunicationService} from "../../services";
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {

  private subscription: Subscription;

  dataSource: MatTableDataSource<Measurement>;
  columns: string[];
  loaded: boolean;

  constructor(
    private firebase: AngularFirestore,
    private communicationService: CommunicationService
  ) {
    this.dataSource = new MatTableDataSource<Measurement>();
    this.communicationService.send(this.dataSource);

    this.columns = ['time', 'temperature', 'humidity'];
    this.subscription = new Subscription();
  }

  @ViewChild(MatSort)
  set sorter(sort: MatSort) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  @ViewChild(MatPaginator)
  set paginator(paginator: MatPaginator) {
    if (paginator) {
      this.dataSource.paginator = paginator;
    }
  }

  ngAfterViewInit(): void {

    const subscription = this.firebase.collection<Measurement>('/measurements')
      .get()
      .pipe(
        map((query: QuerySnapshot<Measurement>) => query.docs),
        map((documents: QueryDocumentSnapshot<Measurement>[]) => documents.map(document => document.data()))
      ).subscribe(measurements => {

        this.dataSource.data = measurements;
        this.loaded = true;
      });

    this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
