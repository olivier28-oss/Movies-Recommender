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
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { DatePipe } from '@angular/common';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SearchComponent } from './components/search/search.component';

const appRoutes: Routes = [
 {path: '', redirectTo: '/welcome', pathMatch: 'full'},
 {path: 'welcome', component: WelcomeComponent},
 {path: 'home', component: HomepageComponent},
 {path: 'navbar', component: NavBarComponent},
 {path: 'dashboard', component: DasboardComponent},
 {path: 'login', component: LoginComponent},
 {path: 'signup', component: SignupComponent},
 {path: 'list', component: ListComponent},
 {path: 'profile', component: ProfileComponent},
 {path: 'search', component: SearchComponent},
 {path: '***', redirectTo: '/welcome', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavBarComponent,
    DasboardComponent,
    SignupComponent,
    ProfileComponent,
    ListComponent,
    LoginComponent,
    WelcomeComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'recommended-system'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  exports: [
    RouterModule],
  providers: [ AuthService, SignupComponent, DasboardComponent, DatePipe], // Can access from modulable components AuthService
  bootstrap: [AppComponent]
})
export class AppModule { }