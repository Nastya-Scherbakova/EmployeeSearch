import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit{
  people: Array<Person>;
  loading: boolean;
  search: string;
  filteredPeople: Array<Person>;
  constructor(private api: ApiService) {
    this.loading = true;
  }

  filterPeople(value) {
    this.search = value;
    if (this.search) {
       this.filteredPeople = this.people.filter(el=>el.name.toUpperCase().includes(this.search.toUpperCase()) || el.lastName.toUpperCase().includes(this.search.toUpperCase()))
    }
    else this.filteredPeople = this.people;

  }

  ngOnInit() {
    this.api.getPersons().subscribe((people) => {
      this.people = people;
      this.filteredPeople = people;
      this.loading = false;
    })
  }
}
