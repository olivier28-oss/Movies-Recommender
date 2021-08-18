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
  email: string='';

  constructor(public http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.logout();
    // this.navbar.isSignedIn = false
  }


  UserInfo(uid: any) {
    this.getUserInfo(uid).subscribe(
      (response: any[]) => {
        // this.getUserInfo(response)
        this.email = response[2];
      },
      (error) => console.log(error));
    }

    getUserInfo(uid: any): Observable<any[]> {
      return this.http.get<any[]>(this.UserUrl + '\'' + uid + '\'')
    }
// getuserInfo(){
//   this.authService.
//   const displayName = user.displayName;
//   const email = user.email;
//   const photoURL = user.photoURL;
//   const emailVerified = user.emailVerified;
// }
  // Tentative to identified logged in users
  // SetUserData(user) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     dob: user.dob
  //   }
  //   return userRef.set(userData, {
  //     merge: true
  //   })
  // }

//   if(user !== null) {
//   // The user object has basic properties such as display name, email, etc.
//   const displayName = user.displayName;
//   const email = user.email;
//   const photoURL = user.photoURL;
//   const emailVerified = user.emailVerified;

//   // The user's ID, unique to the Firebase project. Do NOT use
//   // this value to authenticate with your backend server, if
//   // you have one. Use User.getToken() instead.
//   const uid = user.uid;
// }

}
