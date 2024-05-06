import { Milestone } from "./Milestone";

export class Roadmap {


    constructor(
        private id: Number,
        private name: String,
        private description: String,
        private milestone: Milestone[],
    ){
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
        return this.milestone;
    }

    setName(name: string): void{
        this.name = name;
    }

    setMilestones(milestones: Milestone[]) {
        this.milestone = milestones;
      }

    setId(id: Number): void{
        this.id = id;
    }

    setDescription (): void {
        this.description = this.description;
    }
    addMilestone(newMilestone : Milestone) {
        this.milestone.push(newMilestone)
    }

    




    
    
}