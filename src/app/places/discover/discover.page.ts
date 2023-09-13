import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, MenuController, SegmentChangeEventDetail } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/models/place.model';
import { AuthService } from 'src/app/services/auth.service';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  loadedPlaces !: Place[];
  listedLoadedPlaces !: Place[];
  relevantPlaces !: Place[];
  isLoading = false;
  
  private placesSub !: Subscription;


  constructor(
    private placesService : PlacesService,
    private menuCtrl : MenuController,
    private authService : AuthService  
  ) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);   
    });
  }

  //use the place service here to call fetchplaces then subcribe 
  ionViewWillEnter(){
    this.isLoading = true; //to show the spinner and fetching new data invisibly in the background
    this.placesService.fetchPlace().subscribe(() => {
      this.isLoading = false;
    }); 
  }

  /*
  onOpenMenu(){
    this.menuCtrl.toggle();
  }
  */

  onIonInfinite(ev : any){
    this.loadedPlaces;
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  //observe event change
  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail> | any) {
    if(event.detail.value === 'all'){
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    } else {
      this.relevantPlaces = this.loadedPlaces.filter(
        place => place.userId !== this.authService.userId
      );
      this.listedLoadedPlaces = this.relevantPlaces.slice(1); 
    }
  }
  
  ngOnDestroy(){
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
