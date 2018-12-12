import { Component, OnInit } from '@angular/core';
import { Vacancy } from 'src/app/models/vacancy.model';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vacancy-details',
  templateUrl: './vacancy-details.component.html',
  styleUrls: ['./vacancy-details.component.css']
})
export class VacancyDetailsComponent implements OnInit{
  vacancy: Vacancy;
  loading: boolean;
  id: number;
  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.loading = true;
    this.route.params.subscribe((param) => {
      this.id = param['id'];
    })
  }


  ngOnInit() {
    this.api.getVacancy(this.id).subscribe((vacancy) => {
      this.vacancy = vacancy;
      this.loading = false;
    });
  }
}
