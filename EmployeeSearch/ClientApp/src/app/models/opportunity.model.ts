import { Directory } from "./directory.model";
import { CV } from "./cv.model";

export class Opportunity {
  public id: number;
  public quantity: number;
  public directoryId: number;
  public cVId: number;
  public directory: Directory;
  public CV: CV;
}
