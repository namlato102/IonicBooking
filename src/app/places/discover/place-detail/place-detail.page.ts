import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place !: Place;
  showDescription = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl : NavController,
    private placesService : PlacesService,
    private modalCtrl : ModalController,
    private actionsheetCtrl : ActionSheetController
  ) { }

  ngOnInit() {
    //with acivatedRouted automatically update, because subscribtion listen to changes in the urls will always be live
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has("placeId")){
        //redirecting
        this.navCtrl.navigateBack("/places/tabs/discover");
        return;
      }

      const placeid = paramMap.get('placeId');
      if (placeid !== null){
        this.place = this.placesService.getPlace(placeid);
      }  
    });
  }

  onBookPlace(){
    //this.router.navigateByUrl("/places/tabs/discover");
    //this.navCtrl.navigateBack("/places/tabs/discover");
    this.showDescription = true;
    this.actionsheetCtrl.create({
      header: 'Choose an Action', 
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select')
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random')
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();//to open actionsheet
    });
  }

  openBookingModal(mode: 'select' | 'random'){
    console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent, 
        componentProps: {selectedPlace: this.place, selectedMode: mode} //added selectedMode
      })
      .then(modalEl => {
        console.log(modalEl.role);
        modalEl.present(); //Present the modal overlay after it has been created.
        return modalEl.onDidDismiss();//Returns a promise that resolves when the modal did dismiss.
      })
      .then(resultData => {//this is for the above promise
        console.log(resultData.data, resultData.role);//return bookingData from onBookPlace() from create-booking.component
        if(resultData.role === 'confirm')
        console.log('BOOKED!');//appeared when create-booking finished
      });
  }
}
