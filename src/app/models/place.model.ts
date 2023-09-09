export class Place {
    
    constructor(
        public id ?: string,
        public title ?: string,
        public description ?: string,
        public imageUrl ?: string,
        public price ?: number,
        //added availableFrom, To
        public availableFrom ?: Date | any,
        public availableTo ?: Date | any
    ){
        
    }
}