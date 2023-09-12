import { Data } from "@angular/router";

export class Booking {
    constructor(
        public id ?: string | any,
        public placeId ?: string | any,
        public userId ?: string | any,
        public placeTitle ?: string | any,
        public placeImage ?: string | any,
        public firstName ?: string | any,
        public lastName ?: string | any,
        public guestNumber ?: number | any,
        public bookFrom ?: Date | any,
        public bookTo ?: Date | any,
        
    ){}
}