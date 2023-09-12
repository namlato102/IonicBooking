import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, MenuController, SegmentChangeEventDetail } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  loadedPlaces !: Place[];
  listedLoadedPlaces !: Place[];
  private placesSub !: Subscription;

  constructor(
    private placesService : PlacesService,
    private menuCtrl : MenuController) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);   
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
    console.log(event.detail);
  }
  
  ngOnDestroy(){
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
