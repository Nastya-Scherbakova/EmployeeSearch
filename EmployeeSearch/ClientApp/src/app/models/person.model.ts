import { CV } from "./cv.model";

export class Person {
  public id: number;
  public name: string = '';
  public lastName: string = '';
  public email: string = '';
  public number: string = '';
  public cv: CV;
}
