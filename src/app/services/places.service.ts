import { Injectable } from '@angular/core';
import { Place } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places : Place[] = [
    //added some dummy place construction
    new Place(
      "p1",
      "Manhattan Mansion",
      "In the heart of New York City",
      "https://thumbs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg?w=800&format=webp",
      149.99
    ),
    new Place(
      "p2",
      "L'Amour Toujours",
      "A romantic place in Paris",
      "https://media-cdn.tripadvisor.com/media/photo-s/16/0b/96/09/hotel-amour.jpg",
      189.99
    ),
    new Place(
      "p3",
      "The Foggy Palace",
      "Not your average city trip!",
      "https://www.miabid.com/images/portfolio/germany-hannover-castle-marienburg-aerial-foggy-morning-900.jpg",
      99.99
    ),
  ];

  //getter: get name place without an underscore 
  //return a copy of this._place so can be able to edit the array from other places where we get access to that array
  get places(){
    return [...this._places];
  }

  constructor() { }

  
}
