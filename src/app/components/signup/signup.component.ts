import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe, formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  configUrl = 'http://127.0.0.1:5000/createUser/';
  public uid: string='';
  fName = null;
  lName = null;
  mail = null;
  dob = null;
  email: string = '';
  password: string = '';

  constructor(public authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
  }

  signup(mail: string, pwd: string) {
    this.authService.firebaseAuth.createUserWithEmailAndPassword(mail, pwd).then(value => {
  //  if successfully create user in firebase. only email and password were enabled.
      if(value.user != null){
        console.log('Success!', value);
        this.createInternalUser(value.user.uid);
        this.uid = value.user.uid;
        console.log(this.uid);

      }
    }).catch(err => {
      console.log('Something went wrong:', err.message);
    });
  }

  createInternalUser(uid: string) {
    this.getcreateInternalUser(uid).subscribe(
      (response: any[]) => console.log(response),
      (error) => console.log(error)
    );
  }

// /Jane/Ball/JaneBall@mail.com/1977-11-19/888   ,+ this.fName + '/' + this.lName + '/' + this.email + '/' + this.dob + '/'
getcreateInternalUser(uid: string): Observable<any> {
  return this.http.get<any>(this.configUrl + this.fName + '/' + this.lName + '/' + this.mail + '/' + this.dob + '/' + uid)
}


register(email: string, password: string) { // fName: string, lName: string, , dob: string
    // this.fName = fName;
    // this.lName = lName;
    this.email = email;
    this.password = password;
    // this.dob = dob;
    this.signup(this.email, this.password);
    this.email = this.password = ''; // this.fName = this.lName =
  }


}
