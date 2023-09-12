export class Place {
    
    constructor(
        public id ?: string | any,
        public title ?: string,
        public description ?: string,
        public imageUrl ?: string, //user can take it later
        public price ?: number | any,
        //added availableFrom, To
        public availableFrom ?: Date | any,
        public availableTo ?: Date | any,
        public userId ?: string
    ){}
}