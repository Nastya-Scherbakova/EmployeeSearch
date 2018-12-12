import { Directory } from "./directory.model";
import { Vacancy } from "./vacancy.model";

export class Requirment {
  public id: number;
  public quantity: number;
  public directoryId: number;
  public vacancyId: number;
  public directory: Directory;
  public vacancy: Vacancy;
}
