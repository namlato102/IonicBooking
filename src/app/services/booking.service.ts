import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BehaviorSubject, delay, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private _bookings = new BehaviorSubject<Booking[]>([]);

  get bookings(){
    return this._bookings.asObservable();
  }

  addBooking(
    placeId : string, 
    placeTitle : string,
    placeImage : string,
    firstName : string,
    lastName : string,
    guestNumber : number,
    dateFrom : Date,
    dateTo : Date,  
  ){
    const newBooking = new Booking(
      Math.random().toString(), 
      placeId, 
      this.authService.userId,
      placeTitle,
      placeImage,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
      dateTo
    );

    return this._bookings.pipe(take(1), delay(1000), tap(places => {
      this._bookings.next(places.concat(newBooking));
      })
    )
  }

  cancelBooking(bookingId : string){

  }

  constructor(
    private authService : AuthService,
  ) { }
}
