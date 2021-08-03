import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Observable} from 'rxjs';
// import { SignupComponent } from '../components/signup/signup.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: Observable<firebase.User|null|undefined>;
  public uid: string = '';
  // public fName = null;
  // public lName = null;
  // public dob = null;
  // public email = null;

  // configUrl = 'http://127.0.0.1:5000/createUser/';

  constructor(public firebaseAuth: AngularFireAuth, private http: HttpClient) {
    this.user = firebaseAuth.authState; // information of user will be stored here once logged in
  }

  // // to create user in firebase
  // signup(email: string, password: string) {
  //   this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(value => {
  // //  if successfully create user in firebase. only email and password were enabled.
  //     if(value.user != null){
  //       console.log('Success!', value);
  //       // this.createInternalUser(value.user.uid);
  //     }
  //   }).catch(err => {
  //     console.log('Something went wrong:', err.message);
  //   });
  // }

  login(email: string, password: string) {
    this.firebaseAuth.signInWithEmailAndPassword(email, password).then(value => {
      if(value.user != null){
        this.uid = value.user.uid;
      }
    }).catch(err => {
      console.log('Something went wrong:', err.message);
    });
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  // createInternalUser(uid: string) {
  //   this.signupcomponent.getcreateInternalUser(uid).subscribe(
  //     (response: any[]) => console.log(response),
  //     (error) => console.log(error)
  //   );
  // }

  // /Jane/Ball/JaneBall@mail.com/1977-11-19/888   ,+ this.fName + '/' + this.lName + '/' + this.email + '/' + this.dob + '/'
  // getcreateInternalUser(uid: string): Observable<any[]> {
  //   return this.http.get<any[]>(this.configUrl + this.fName + '/' + this.lName + '/' + this.email + '/' + this.dob + '/' + uid)
  // }
}
