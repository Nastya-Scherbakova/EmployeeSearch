import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit{
  company: Company;
  loading: boolean;
  id: number;
  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.loading = true;
    this.route.params.subscribe((param) => {
      this.id = param['id'];
    })
  }


  ngOnInit() {
    this.api.getCompany(this.id).subscribe((company) => {
      this.company = company;
      this.loading = false;
    });
  }
}
