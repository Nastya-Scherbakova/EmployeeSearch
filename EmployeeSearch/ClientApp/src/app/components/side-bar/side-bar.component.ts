import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{
  menuItems = [
    {
      title:'Home',
      link:'/'
    },
    {
      title:'Companies',
      link:'/companies'
    },
    {
      title:'Persons',
      link:'/persons'
    },
    {
      title:'Vacancies',
      link:'/vacancies'
    },
    {
      title:'Statistics',
      link:'/statistics'
    }
    ];
  currentItem: string;
  constructor(private router: Router) {
    
  }
  ngOnInit() {
    this.router.events.subscribe((path: any) => {
      this.currentItem = path.url ? path.url : this.currentItem;
    });
  }

  changeRoad(road: string) {
    this.currentItem = road;
  }
}
