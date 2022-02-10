import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputVisitorDetailsComponent } from './input-visitor-details/input-visitor-details.component';
import { RequestQueueNumberComponent } from './request-queue-number/request-queue-number.component';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from './tools/material.module';
import { APP_BASE_HREF } from '@angular/common';
import { VisitorListComponent } from './visitor-list/visitor-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from './global.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxBarcodeModule } from 'ngx-barcode';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { QueueComponent } from './queue/queue.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InputVisitorDetailsComponent,
    RequestQueueNumberComponent,
    VisitorListComponent,
    QueueComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    NgxBarcodeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule, 
    MatProgressBarModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
