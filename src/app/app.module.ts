import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from 'src/components/navbar/navbar.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from 'src/components/project/project.component';
import { AboutComponent } from 'src/components/about/about.component';
import { HomeComponent } from 'src/components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectComponent,
    AboutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component:  HomeComponent},
      { path: 'project', component: ProjectComponent },
      { path: 'about', component: AboutComponent },
    ])
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
