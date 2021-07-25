import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: Observable<firebase.User|null|undefined>;
  public uid: string = '';
  configUrl = 'http://127.0.0.1:5000/createUser/';

  constructor(private firebaseAuth: AngularFireAuth, private http: HttpClient) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(value => {
      console.log('Success!', value);
      // this.createInternalUser(value.user.uid);
    }).catch(err => {
      console.log('Something went wrong:', err.message);
    });
  }

  login(email: string, password: string) {
    this.firebaseAuth.signInWithEmailAndPassword(email, password).then(value => {
      // this.uid = value.user.uid;
    }).catch(err => {
      console.log('Something went wrong:', err.message);
    });
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  createInternalUser(uid: any) {
    this.http.get(this.configUrl + uid).subscribe(
      // (response: any[]) => console.log(response),
      (error) => console.log(error)
    );
  }
}
