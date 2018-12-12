import { Component, OnInit } from '@angular/core';
import { Vacancy } from 'src/app/models/vacancy.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent implements OnInit{
  vacancies: Array<Vacancy>;
  loading: boolean;
  search: string;
  filteredVacancies: Array<Vacancy>;
  constructor(private api: ApiService) {
    this.loading = true;
  }

  filterVacancies(value) {
    this.search = value;
    if (this.search) {
       this.filteredVacancies = this.vacancies.filter(el=>el.position.toUpperCase().includes(this.search.toUpperCase()) || el.salary.toString().toUpperCase().includes(this.search.toUpperCase()))
    }
    else this.filteredVacancies = this.vacancies;

  }

  ngOnInit() {
    this.api.getVacancies().subscribe((vacancies) => {
      this.vacancies = vacancies;
      this.filteredVacancies = vacancies;
      this.loading = false;
    })
  }
}
