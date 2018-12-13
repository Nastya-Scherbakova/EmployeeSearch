import { Company } from "./company.model";
import { Requirment } from "./requirment.model";

export class Vacancy {
  public id: number;
  public position: string = '';
  public salary: number = 0;
  public socialPackage: boolean = false;
  public companyId: number = 1;
  public company: Company;
  public requirments: Array<Requirment>;
}
