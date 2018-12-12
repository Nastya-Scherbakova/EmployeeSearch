// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// angular material
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';

//pages and components
import { AppComponent } from './app.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { PersonsComponent } from './pages/persons/persons.component';
import { VacanciesComponent } from './pages/vacancies/vacancies.component';
import { VacancyDetailsComponent } from './pages/vacancy-details/vacancy-details.component';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';
import { PersonDetailsComponent } from './pages/person-details/person-details.component';

// services
import { ApiService } from './services/api.service';


@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HomeComponent,
    CompaniesComponent,
    PersonsComponent,
    VacanciesComponent,
    VacancyDetailsComponent,
    CompanyDetailsComponent,
    PersonDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'companies', component: CompaniesComponent },
      { path: 'persons', component: PersonsComponent },
      { path: 'vacancies', component: VacanciesComponent },
      { path: 'vacancy/:id', component: VacancyDetailsComponent },
      { path: 'company/:id', component: CompanyDetailsComponent },
      { path: 'person/:id', component: PersonDetailsComponent },
    ])
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
