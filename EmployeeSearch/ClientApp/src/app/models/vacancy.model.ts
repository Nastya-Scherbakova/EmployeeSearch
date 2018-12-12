import { Company } from "./company.model";
import { Requirment } from "./requirment.model";

export class Vacancy {
  public id: number;
  public position: string;
  public salary: number;
  public socialPackage: boolean;
  public companyId: number;
  public company: Company;
  public requirments: Array<Requirment>;
}
