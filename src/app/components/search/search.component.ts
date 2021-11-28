import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CommunicationService} from "../../services";
import {Measurement} from "../../types";
import {DatePipe} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  dataSource: MatTableDataSource<Measurement>;

  @Output("toggle")
  toggleEvent: EventEmitter<void> = new EventEmitter();

  temperature: number;
  humidity: number;
  time: string;

  constructor(
    private dateTransformer: DatePipe,
    private communicationService: CommunicationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.communicationService.receive().subscribe(dataSource => {
      this.dataSource = dataSource;
      this.dataSource.filterPredicate = (data: Measurement, filter: string) => this.filter(data, filter);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(): void {

     let filter = '';
     filter += (this.time ? this.time : '') + ';';
     filter += (this.temperature ? this.temperature : '') + ';';
     filter += (this.humidity ? this.humidity : '');

    this.dataSource.filter = filter;
    this.toggleEvent.emit();
  }

  clear() {
    this.dataSource.filter = '';
    this.toggleEvent.emit();
  }

  filter(data: Measurement, filter: string): boolean {
    const search = filter.split(';');

    const time = search[0] === '' ? null : search[0];
    const temperature = search[1] === '' ? null : parseFloat(search[1]);
    const humidity = search[2] === '' ? null : parseFloat(search[2]);
    const dateTime = this.dateTransformer.transform(data.time.toDate(), 'dd/MM/YYYY HH:mm:ss');

    let status = true;
    if (time) status = !!dateTime && dateTime.includes(time);
    if (temperature) status = status && temperature === data.temperature;
    if (humidity) status = status && humidity === data.humidity;
    return status;
  }

}
