import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
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
    private bookingService : BookingService,
    private loadingCtrl : LoadingController
  ) { }

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(bookings =>{
      this.loadedBookings = bookings;
    })
  }

  onCancelBooking(bookingId : string , slidingEl : IonItemSliding){
    slidingEl.close();
    //cancel Booking with id offerId
    this.loadingCtrl
      .create({ message : 'Cancelling...' })
      .then(loadingEl => {
        loadingEl.present();
        //if not subcribe nevet got execute
        this.bookingService.cancelBooking(bookingId).subscribe(() => {
          loadingEl.dismiss();
        });

      })

  }

  ngOnDestroy() {
    if(this.bookingSub){
      this.bookingSub.unsubscribe();
    }
  }
}
