import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit{
  companies: Array<Company>;
  loading: boolean;
  search: string;
  filteredCompanies: Array<Company>;
  constructor(private api: ApiService) {
    this.loading = true;
  }

  filterCompanies(value) {
    this.search = value;
    if (this.search) {
       this.filteredCompanies = this.companies.filter(el=>el.title.toUpperCase().includes(this.search.toUpperCase()))
    }
    else this.filteredCompanies = this.companies;

  }

  ngOnInit() {
    this.api.getCompanies().subscribe((companies) => {
      this.companies = companies;
      this.filteredCompanies = companies;
      this.loading = false;
    });
   
  }
}
