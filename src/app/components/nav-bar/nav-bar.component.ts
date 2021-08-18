import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isAuthenticated;

  constructor(private authService: AuthService, private location: Location, public _router: Router) {

   }

  ngOnInit() {
    this.authService.authStatusSub;
    this.authService.currentAuthStatus.subscribe(authStatus => this.isAuthenticated = authStatus)

  }

  goBack(): void {
    this.location.back();
  }



}
