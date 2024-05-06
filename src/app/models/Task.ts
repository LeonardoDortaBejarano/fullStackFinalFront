export class Task {
    getId(): number|undefined {
      return this.id;
    }

    
    
    private link : String = "";
    private orderValue: String = "";
    constructor (
        private name : String,
        private id?: number,
        private complete : boolean = false
    ) {

    }

    isCompleted():boolean {
        return this.complete;
    }

    setCompleted(option:boolean): void {
        console.log(this.id);
        this.complete = option;
    }



    getName(): String {
        return this.name;
    }
}