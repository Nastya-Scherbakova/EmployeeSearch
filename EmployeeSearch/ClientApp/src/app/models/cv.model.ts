import { Opportunity } from "./opportunity.model";
import { Person } from "./person.model";

export class CV {
  public id: number;
  public position: string;
  public salary: number;
  public personId: number;
  public person: Person;
  public opportunities: Array<Opportunity>;
}
