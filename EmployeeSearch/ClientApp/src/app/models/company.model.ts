import { Vacancy } from "./vacancy.model";

export class Company {
  public id: number;
  public title: string = '';
  public email: string = '';
  public number: string = '';
  public vacancies: Array<Vacancy>;
}
