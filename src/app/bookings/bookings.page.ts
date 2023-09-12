import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking.model';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {

  loadedBookings !: Booking[];
  private bookingSub !: Subscription;

  constructor(
    private bookingService : BookingService
  ) { }

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(bookings =>{
      this.loadedBookings = bookings;
    })
  }

  onCancelBooking(offerId : string | undefined, slidingEl : IonItemSliding){
    slidingEl.close();
    //cancel Booking with id offerId

  }

  ngOnDestroy() {
    if(this.bookingSub){
      this.bookingSub.unsubscribe();
    }
  }
}
