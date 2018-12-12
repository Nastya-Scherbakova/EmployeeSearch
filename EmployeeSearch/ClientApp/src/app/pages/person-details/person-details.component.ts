import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit{
  person: Person;
  loading: boolean;
  id: number;
  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.loading = true;
    this.route.params.subscribe((param) => {
      this.id = param['id'];
    })
  }


  ngOnInit() {
    this.api.getPerson(this.id).subscribe((person) => {
      this.person = person;
      this.loading = false;
    });
  }
}
