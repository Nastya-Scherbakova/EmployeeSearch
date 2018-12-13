import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DataDialog } from 'src/app/dialogs/data/data.dialog';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  peopleStat: Array<Person>;
  loading: boolean;
  search: string;
  onLoad: BehaviorSubject<any> = new BehaviorSubject('');
  bigCompanies: Company[];
  public chartType: string = 'doughnut';

  public chartDatasets: Array<any> = [
    { data: [], label: 'Companies vacancies statistics' }
  ];

  public chartLabels: Array<any> = [];


  public chartOptions: any = {
    responsive: true
  };
  public chartTypePersons: string = 'line';

  public chartDatasetsPersons: Array<any> = [
  ];

  public chartLabelsPersons: Array<any> = [];


  constructor(private api: ApiService, public dialog: MatDialog) {
    this.loading = true;
    var count = 0;
    this.onLoad.asObservable()
      .subscribe(() => {
        count++;
        if (count == 3) this.loading = false;
      });
    
  }

  ngOnInit() {
    this.loadStatistics();
  }
  loadStatistics() {
    this.loading = true;
    this.api.getMainDirectories().subscribe((people) => {
      this.peopleStat = people;
      this.peopleStat.forEach(person => {
        person.cv.opportunities.forEach(op => {
          if(this.chartLabelsPersons.indexOf(op.directory.name) == -1) this.chartLabelsPersons.push(op.directory.name);
        });
      })
      this.peopleStat.forEach(person => {
        let newObj = {
          data: [],
          label: person.name + ' ' + person.lastName
        }
        this.chartLabelsPersons.forEach(label => {
          let finded = person.cv.opportunities.filter(el => el.directory.name == label);
          if (finded.length > 0) {
            newObj.data.push(finded[0].quantity);
          }
          else newObj.data.push(0);
        })
        this.chartDatasetsPersons.push(newObj)
      })
      this.onLoad.next('');
    });
    this.api.getBigCompanies().subscribe(companies => {
      this.bigCompanies = companies;
      this.bigCompanies.forEach(comp => {
        this.chartDatasets[0].data.push(comp.vacancies.length);
        this.chartLabels.push(comp.title);
      })
      this.onLoad.next('');
    })
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
