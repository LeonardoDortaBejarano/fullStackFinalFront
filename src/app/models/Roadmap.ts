export class Roadmap {

    constructor(
        private id: Number,
        private name: String,
        private description: String,
    ){
    }
    
    getName(): String{
        return this.name;
    }
    
    
}