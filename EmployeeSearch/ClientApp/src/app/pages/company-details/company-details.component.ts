import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { DataDialog } from 'src/app/dialogs/data/data.dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit{
  company: Company;
  loading: boolean;
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
      data: this.company
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.putCompany(result).subscribe();
      }
      
    });
  }

  ngOnInit() {
    this.api.getCompany(this.id).subscribe((company:Company) => {
      this.company = company;
      this.loading = false;
    });
  }
  deleteCompany() {
    this.api.deleteCompany(this.id).subscribe();
  }
}
