import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Vacancy } from 'src/app/models/vacancy.model';
import { DataDialog } from 'src/app/dialogs/data/data.dialog';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit{
  person: Person;
  vacancies: Array<Vacancy>;
  loading: boolean;
  loadingVacancies = true;
  id: number;
  constructor(private api: ApiService, private route: ActivatedRoute, public dialog: MatDialog) {
    this.loading = true;
    this.route.params.subscribe((param) => {
      this.id = param['id'];
    })
  }
  openDialog() {
    const dialogRef = this.dialog.open(DataDialog, {
      width: '500px',
      data: this.person
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.putPerson(result).subscribe();
      }
      
    });
  }

  ngOnInit() {
    this.api.getPerson(this.id).subscribe((person:Person) => {
      this.person = person;
      this.loading = false;
    });
    this.api.getVacanciesForPerson(this.id).subscribe((vacancies) => {
      this.vacancies = vacancies;
      this.loadingVacancies = false;
    })
  }

  deletePerson() {
    this.api.deletePerson(this.id).subscribe();
  }
}
