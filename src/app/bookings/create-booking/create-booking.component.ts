import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/models/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent  implements OnInit {
  @Input() selectedPlace !: Place;
  @Input() selectedMode !: 'select' | 'random';//forwarding from the actionsheet into the modal 
  //@ViewChild('f', { static: true }) form !: NgForm; //angular feature
  startDate !: string ;
  endDate !: string;
  

  constructor(
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);

    //pick random range between start and end date only if selected mode is random 
    if (this.selectedMode === 'random') {
      this.startDate = new Date(
        availableFrom.getTime() + //in milisecond
          Math.random() *
            (availableTo.getTime() -
              7 * 24 * 60 * 60 * 1000 - // 1 week deducted
              availableFrom.getTime())
      ).toISOString();//required

      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() *
            (new Date(this.startDate).getTime() +
              6 * 24 * 60 * 60 * 1000 -
              new Date(this.startDate).getTime())
      ).toISOString();
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  //read on Ionic & Angular Learning note or https://angular.io/api/forms/NgModel
  onBookPlace(form : NgForm){
    //check valid
    if (!form.valid || !this.datesValid(form)) {
      return;
    }

    //make page disappeared
    this.modalCtrl.dismiss(
      {//this show on resultData in place-detail.page.ts
        bookingData: {
          firstName: form.value['first-name'],
          lastName: form.value['last-name'],
          guestNumber: +form.value['guest-number'],
          startDate: new Date(form.value['date-from']),
          endDate: new Date(form.value['date-to'])
        }
      },
      'confirm'
    );
  }

  datesValid(form : NgForm) {
    const startDate = new Date(form.value['date-from']);//choose from html page
    const endDate = new Date(form.value['date-to']);//choose from html page
    return endDate > startDate;
  }

}
