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

  getCandidatesForVacancy(id: number): Observable<Array<Person>> {
    return this.http.get<Array<Person>>('/api/Vacancies/' + id + '/Candidates');
  }

  getVacanciesForPerson(id: number): Observable<Array<Vacancy>> {
    return this.http.get<Array<Vacancy>>('/api/People/' + id + '/Vacancies');
  }

  putCompany(data: Company): Observable<Company> {
    return this.http.put<Company>('/api/Companies/' + data.id, data);
  }

  putPerson(data: Person): Observable<Person> {
    return this.http.put<Person>('/api/People/' + data.id, data);
  }

  putVacancy(data: Vacancy): Observable<Vacancy> {
    return this.http.put<Vacancy>('/api/Vacancies/' + data.id, data);
  }

  addPerson(data: Person): Observable<Person> {
    return this.http.post<Person>('/api/People', data);
  }

  addCompany(data: Company): Observable<Company> {
    return this.http.post<Company>('/api/Companies', data);
  }

  addVacancy(data: Vacancy): Observable<Vacancy> {
    return this.http.post<Vacancy>('/api/Vacancies', data);
  }

  deletePerson(id: number): Observable<Person> {
    return this.http.delete<Person>('/api/People/' + id);
  }

  deleteCompany(id: number): Observable<Company> {
    return this.http.delete<Company>('/api/Companies/' + id);
  }

  deleteVacancy(id: number): Observable<Vacancy> {
    return this.http.delete<Vacancy>('/api/Vacancies/' + id);
  }

  getBigCompanies(): Observable<Array<Company>> {
    return this.http.get<Array<Company>>('/api/Statistics/BigCompanies');
  }

  getMainDirectories(): Observable<Array<Person>> {
    return this.http.get<Array<Person>>('/api/Statistics/MainDirectories');
  }
}
