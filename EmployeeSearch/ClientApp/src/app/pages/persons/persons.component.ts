import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DataDialog } from 'src/app/dialogs/data/data.dialog';

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
  constructor(private api: ApiService, public dialog: MatDialog) {
    this.loading = true;
  }

  openDialog() {
    let person = new Person();
    const dialogRef = this.dialog.open(DataDialog, {
      width: '500px',
      data: person
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.addPerson(result).subscribe(()=>this.loadPersons());
        
      }
      
    });
  }

  filterPeople(value) {
    this.search = value;
    if (this.search) {
       this.filteredPeople = this.people.filter(el=>el.name.toUpperCase().includes(this.search.toUpperCase()) || el.lastName.toUpperCase().includes(this.search.toUpperCase()))
    }
    else this.filteredPeople = this.people;

  }

  ngOnInit() {
    this.loadPersons();
  }
  loadPersons() {
    this.loading = true;
    this.api.getPersons().subscribe((people) => {
      this.people = people;
      this.filteredPeople = people;
      this.loading = false;
    })
  }
}
