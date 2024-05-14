import { Milestone } from "./Milestone";
import { Task } from "./Task";

export interface Roadmap {
     id: Number,
     userId: Number,
     totalTask: Number,
     totalDoneTask: Number,
     donePercentage: Number,
     created_date: Date,
     name: String,
     description: String,
     color: String,
     milestones: Milestone[],
     order: Number
}

/* export class Roadmap {
    public get totalDoneTask(): Number {
        return this._totalDoneTask;
    }
    public set totalDoneTask(value: Number) {
        this._totalDoneTask = value;
    }
    public get totalTask(): Number {
        return this._totalTask;
    }
    public set totalTask(value: Number) {
        this._totalTask = value;
    }
    public get id(): Number {
        return this._id;
    }
    public set id(value: Number) {
        this._id = value;
    }
    public get userId(): Number {
        return this._userId;
    }
    public set userId(value: Number) {
        this._userId = value;
    }



    constructor(
        private _id: Number,
        private _userId: Number,
        private _totalTask: Number,
        private _totalDoneTask: Number,
        private _donePercentage: Number,
        private _created_date: Date,
        private name: String,
        private description: String,
        private milestones: Milestone[]

    ){
    }

    public get created_date(): Date {
        return this._created_date;
    }
    public set created_date(value: Date) {
        this._created_date = value;
    }
    public get donePercentage(): Number {
        return this._donePercentage;
    }
    public set donePercentage(value: Number) {
        this._donePercentage = value;
    }

    getName(): String{ 
        return this.name;
    }

    getDescription(): String{ 
        return this.description;
    }

    getId(): Number {
        return this.id;
    }

    getMilestone(): Milestone[] {
        return this.milestones;
    }

    setName(name: string): void{
        this.name = name;
    }

    setMilestones(milestoness: Milestone[]) {
        this.milestones = milestoness;
      }
    
      setMilestonesFromData(data: Milestone[]) {
        this.milestones = milestoness;
      }

    setId(id: Number): void{
        this.id = id;
    }

    setDescription (): void {
        this.description = this.description;
    }
    
    addMilestone(newMilestone : Milestone) {
        this.milestones.push(newMilestone)
    }

    getTaskQuantity(): number{
        let totalNumberOfTask: number = 0;
         this.getMilestone().forEach((milestones: Milestone )=> {
            totalNumberOfTask += milestones.getTasks().length;
        });
        return totalNumberOfTask;
    }

    getDoneTaskQuantity(): number{
        let totalNumberOfTask: number = 0;
         this.getMilestone().forEach((milestones: Milestone )=> {
            milestones.getTasks().forEach((task:Task) => {
                task.isCompleted()? ++totalNumberOfTask:null
            });;
        });
        return totalNumberOfTask;
    } 
    
    }*/



    




    
    
