import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { ApiService } from 'src/app/services/api.service';
import { DataDialog } from 'src/app/dialogs/data/data.dialog';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies: Array<Company>;
  loading: boolean;
  search: string;
  filteredCompanies: Array<Company>;
  constructor(private api: ApiService, public dialog: MatDialog) {
    this.loading = true;
  }
  openDialog() {
    let company = new Company();
    const dialogRef = this.dialog.open(DataDialog, {
      width: '500px',
      data: company
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.addCompany(result).subscribe(()=>this.loadCompanies());
        
      }
      
    });
  }
  filterCompanies(value) {
    this.search = value;
    if (this.search) {
      this.filteredCompanies = this.companies.filter(el => el.title.toUpperCase().includes(this.search.toUpperCase()))
    }
    else this.filteredCompanies = this.companies;

  }

  ngOnInit() {
    
    this.loadCompanies();
  }

  loadCompanies() {
    this.loading = true;
    this.api.getCompanies().subscribe((companies) => {
      this.companies = companies;
      this.filteredCompanies = companies;
      this.loading = false;
    });
  }
}
