import { Component, OnInit } from '@angular/core';
import { Vacancy } from 'src/app/models/vacancy.model';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/models/person.model';
import { MatDialog } from '@angular/material/dialog';
import { DataDialog } from 'src/app/dialogs/data/data.dialog';

@Component({
  selector: 'app-vacancy-details',
  templateUrl: './vacancy-details.component.html',
  styleUrls: ['./vacancy-details.component.css']
})
export class VacancyDetailsComponent implements OnInit{
  vacancy: Vacancy;
  candidates: Array<Person>;
  loading: boolean;
  loadingCandidates = true;
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
      data: this.vacancy
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.putVacancy(result).subscribe();
      }
      
    });
  }

  ngOnInit() {
    this.api.getVacancy(this.id).subscribe((vacancy:Vacancy) => {
      this.vacancy = vacancy;
      this.loading = false;
    });
    this.api.getCandidatesForVacancy(this.id).subscribe((candidates) => {
      this.candidates = candidates;
      this.loadingCandidates = false;
    });
  }

  deleteVacancy() {
    this.api.deleteVacancy(this.id).subscribe();
  }
}
