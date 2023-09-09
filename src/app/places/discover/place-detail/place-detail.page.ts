import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl : NavController,
    private placesService : PlacesService,
    private modalCtrl : ModalController
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
    this.modalCtrl
      .create({
        component: CreateBookingComponent, 
        componentProps: {selectedPlace: this.place}
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role);
        if(resultData.role === 'confirm')
        console.log('BOOKED!');
      });
  }
}
