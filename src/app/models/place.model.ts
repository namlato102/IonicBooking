import { PlaceLocation } from "./location.model";

export class Place {
    
    constructor(
        public id ?: string | any,
        public title ?: string | any,
        public description ?: string,
        public imageUrl ?: string | any, //user can take it later
        public price ?: number,
        //added availableFrom, To
        public availableFrom ?: Date | any,
        public availableTo ?: Date | any,
        public userId ?: string,
        public location ?: PlaceLocation
    ){}
}