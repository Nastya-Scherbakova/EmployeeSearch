import { Component, OnInit } from '@angular/core';
import { Vacancy } from 'src/app/models/vacancy.model';
import { ApiService } from 'src/app/services/api.service';
import { DataDialog } from 'src/app/dialogs/data/data.dialog';
import { MatDialog } from '@angular/material/dialog';

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
  constructor(private api: ApiService, public dialog: MatDialog) {
    this.loading = true;
  }

  openDialog() {
    let vacancy = new Vacancy();
    const dialogRef = this.dialog.open(DataDialog, {
      width: '500px',
      data: vacancy
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.addVacancy(result).subscribe(()=>this.loadVacancies());
        
      }
      
    });
  }

  filterVacancies(value) {
    this.search = value;
    if (this.search) {
       this.filteredVacancies = this.vacancies.filter(el=>el.position.toUpperCase().includes(this.search.toUpperCase()) || el.salary.toString().toUpperCase().includes(this.search.toUpperCase()))
    }
    else this.filteredVacancies = this.vacancies;

  }

  ngOnInit() {
    this.loadVacancies();
  }

  loadVacancies() {
    this.loading = true;
    this.api.getVacancies().subscribe((vacancies) => {
      this.vacancies = vacancies;
      this.filteredVacancies = vacancies;
      this.loading = false;
    })
  }
}
