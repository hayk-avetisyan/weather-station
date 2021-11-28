import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {FIREBASE_CONFIGURATION} from "../environments/firebase.configuraion";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppComponent, SearchComponent, TableComponent} from './components';
import {CommunicationService, TimestampPipe} from "./services";
import {MaterialModule} from "./material.module";

@NgModule({
  declarations: [
    AppComponent,
    TimestampPipe,
    SearchComponent,
    TableComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [
    CommunicationService,
    DatePipe,
    {
      provide: FIREBASE_OPTIONS,
      useValue: FIREBASE_CONFIGURATION
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
