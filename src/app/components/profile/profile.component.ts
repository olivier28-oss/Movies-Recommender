import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // const user = firebase.auth().currentUser;
  UserUrl = 'http://127.0.0.1:5000/getUserInfo/';
  UserCommentUrl = 'http://127.0.0.1:5000/getUserComment/';
  userCommentInfo: any[] = [];
  firstName: string='';
  lastName: string='';
  email: string='';
  dateofBirth:string='';
  age: any;
  showAge: any;
  initial: any;


  constructor(public http: HttpClient, private authService: AuthService) {
    this.UserInformation();
   }

  ngOnInit(): void {
    // console.log(this.userInfo);

  }

  signOut() {
    this.authService.logout();
    // this.navbar.isSignedIn = false
  }

  UserInformation(){
    this.UserInfo(this.authService.uid);
    this.UserComment(this.authService.uid);
  }

  UserInfo(uid:any) {
    this.getUserInfo(uid).subscribe(
      (response: any[]) => {

        this.firstName = response[0],
        this.lastName = response[1],
        this.email = response[2],
        this.dateofBirth = response[3]

        this.initial = this.firstName.charAt(0).toUpperCase() + this.lastName.charAt(0).toUpperCase();
        var date = new  Date (this.dateofBirth);
        this.ageCalculator(date)

      },
      (error) => console.log(error))
    }

    getUserInfo(uid:any): Observable<any[]> {
      return this.http.get<any[]>(this.UserUrl + uid)
    }


    UserComment(uid:any) {
      this.getUserComment(uid).subscribe(
        (response: any[]) => console.log(this.userCommentInfo=response),
        (error) => console.log(error))
      }

      getUserComment(uid:any): Observable<any[]> {
        return this.http.get<any[]>(this.UserCommentUrl + uid)
      }

      ageCalculator(date: Date){

          const convertAge = new Date(date);
          const timeDiff = Math.abs(Date.now() - convertAge.getTime());
          this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);

      }
}
