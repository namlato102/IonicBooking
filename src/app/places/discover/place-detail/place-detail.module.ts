import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceDetailPageRoutingModule } from './place-detail-routing.module';

import { PlaceDetailPage } from './place-detail.page';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { SharedModule } from 'src/app/shared/shared.modul';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceDetailPageRoutingModule,
    SharedModule //able to use the picker and map modal in this component
  ],
  declarations: [PlaceDetailPage, CreateBookingComponent],
  //added createBookingcomponent
  //entryComponents: [createBookingComponent] no need
})
export class PlaceDetailPageModule {}
