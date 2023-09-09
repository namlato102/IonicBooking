import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, MenuController, SegmentChangeEventDetail } from '@ionic/angular';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  loadedPlaces !: Place[];

  constructor(
    private placesService : PlacesService,
    private menuCtrl : MenuController) { }

  ngOnInit() {
    this.loadedPlaces = this.placesService.places;
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
  

}
