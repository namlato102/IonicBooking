import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places.service';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { AuthService } from 'src/app/services/auth.service';
import { MapModalComponent } from 'src/app/shared/map-modal/map-modal.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {

  place !: Place;
  isBookable = true;
  private placeSub !: Subscription;
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl : NavController,
    private placesService : PlacesService,
    private modalCtrl : ModalController,
    private actionsheetCtrl : ActionSheetController,
    private bookingService : BookingService,
    private loadingCtrl : LoadingController,
    private authService : AuthService,
    private alertCtrl : AlertController,
    private router : Router,
  ) { }
  
  ngOnInit() {
    //with acivatedRouted automatically update, because subscribtion listen to changes in the urls will always be live
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has("placeId")){
        //redirecting
        this.navCtrl.navigateBack("/places/tabs/discover");
        return;
      }

      this.isLoading = true; //before fetching place
      const placeId = paramMap.get('placeId');
      if (placeId != null) {
        this.placeSub = this.placesService.getPlace(placeId).subscribe(place => {
          this.place = place;
          this.isBookable = place.userId !== this.authService.userId;// if it have the same userid  cannot book
          this.isLoading = false;//done fetching it
        },
        err => { //using when type in http://localhost:8100/places/tabs/discover/"differentID"
          this.alertCtrl.create({
            header: 'An error occurred!',
            message: 'Place could not be fetched. Please try again later.',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  this.router.navigate(['/places/tabs/discover']);
                }
              }
            ]
          }).then(alertEl => {
              alertEl.present();
           });
        });
      }
    });
  }

  onBookPlace(){
    //this.router.navigateByUrl("/places/tabs/discover");
    //this.navCtrl.navigateBack("/places/tabs/discover");
    //this.showDescription = true;
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
        return modalEl.onDidDismiss();//Returns a promise that resolves when the modal did dismiss. like what did i do after i dismiss
      })
      .then(resultData => {//this is for the above promise , return bookingData from onBookPlace() from create-booking.component
        if(resultData.role === 'confirm'){
          this.loadingCtrl
            .create({message: 'Booking Place...'})
            .then(loadingEl => {
              loadingEl.present(); //like the new offer
              console.log(resultData.data, resultData.role)
              const data = resultData.data.bookingData;
              console.log('BOOKED!');//appeared when create-booking finished
              this.bookingService.addBooking(
                this.place.id,
                this.place.title,
                this.place.imageUrl,
                data.firstName,
                data.lastName,
                data.guestNumber,
                data.startDate,
                data.endDate
              ).subscribe(() => {
                loadingEl.dismiss();

              })
            })
        }
      });
  }

  onShowFullMap() {
    this.modalCtrl
      .create({
        component: MapModalComponent,
        componentProps: {
          center: {
            lat: this.place.location?.lat,
            lng: this.place.location?.lng
          },
          selectable: false,
          closeButtonText: 'Close',
          title: this.place.location?.address
        }
      })
      .then(modalEl => {
        modalEl.present();
      });
  }

  ngOnDestroy() {
     if(this.placeSub){
      this.placeSub.unsubscribe();
     }
  }

}
