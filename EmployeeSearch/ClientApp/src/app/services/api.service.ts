import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Person } from "../models/person.model";
import { Company } from "../models/company.model";
import { Vacancy } from "../models/vacancy.model";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getPersons(): Observable<Array<Person>> {
    return this.http.get<Array<Person>>('/api/People');
  }

  getCompanies(): Observable<Array<Company>> {
    return this.http.get<Array<Company>>('/api/Companies');
  }

  getVacancies(): Observable<Array<Vacancy>> {
    return this.http.get<Array<Vacancy>>('/api/Vacancies');
  }

  getVacancy(id: number): Observable<Vacancy> {
    return this.http.get<Vacancy>('/api/Vacancies/' + id);
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>('/api/People/' + id);
  }

  getCompany(id: number): Observable<Company> {
    return this.http.get<Company>('/api/Companies/' + id);
  }
}
