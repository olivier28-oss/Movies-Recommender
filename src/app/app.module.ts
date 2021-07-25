import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { DasboardComponent } from './components/dasboard/dasboard.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule }   from '@angular/forms';

const appRoutes: Routes = [
 {path: '', component: HomepageComponent},
 {path: 'navbar', component: NavBarComponent},
 {path: 'dashboard', component: DasboardComponent},
 {path: 'signup', component: SignupComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavBarComponent,
    DasboardComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  exports: [RouterModule],
  providers: [ AuthService, DasboardComponent], // Can access from modulable components AuthService
  bootstrap: [AppComponent]
})
export class AppModule { }
