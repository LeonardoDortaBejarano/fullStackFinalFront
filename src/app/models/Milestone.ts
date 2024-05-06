import {Task} from "./Task";

export class Milestone {
  private id?: Number;
  private orderValue?: string
    constructor (
      
      private name : String,
      private content : String,
      private tasks : Task[])
      {}

      getName():String {
        return this.name;
      }

      getContent():String {
        return this.content;
      }

      getTasks():Task[] {
        return this.tasks;
      }


}