import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { BehaviorSubject, Observable} from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { SignupComponent } from '../components/signup/signup.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: Observable<firebase.User | null> | undefined;
  public uid: string = '';
  currentU = null as any; // assigning the default value to fixed null not assignable issue
  isLoggedIn = false;

  // public fName = null;
  // public lName = null;
  // public dob = null;
  // public email = null;

  // configUrl = 'http://127.0.0.1:5000/createUser/';
  currentUser= null as any;

  constructor(
    public firebaseAuth: AngularFireAuth,
    private http: HttpClient,
    private router: Router) {
      firebase.initializeApp(environment.firebase);
      // firebase.auth().onAuthStateChanged((user) => (this.currentU = user)); // added for user persistence
      this.authStatusListener();
      // this.randomFunction();
    }

    // user$ = this.firebaseAuth.authState; // information of user will be stored here once logged in
  // client = firebase.auth().currentUser;

  // initial
  public authStatusSub = new BehaviorSubject(this.currentUser);
  currentAuthStatus = this.authStatusSub.asObservable();

//   currentAuthStatus = this.authStatusSub.asObservable();


// initially
authStatusListener(){
  this.firebaseAuth.onAuthStateChanged((credential) =>{
    if(credential){
      // console.log(credential);
      this.authStatusSub.next(credential);
      console.log('User is logged in');
    }
    else{
      this.authStatusSub.next(null);
      console.log('User is logged out');
    }
  })
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


  // login function before persistence
//   login(email: string, password: string) {

//       this.firebaseAuth.signInWithEmailAndPassword(email, password).then(value => {
//         if(value.user != null){
//           this.uid = value.user.uid;
//         }
//       }).catch(err => {
//         console.log('Something went wrong:', err.message);
//       });
//  }

 login(email: string, password: string) {
  this.firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(
  () =>{

    this.firebaseAuth.signInWithEmailAndPassword(email, password).then(value => {
      if(value.user != null){
        // this.isLoggedIn == true;
        // console.log('User logged in');
        this.uid = value.user.uid;
        // console.log(this.uid);

        // localStorage.setItem('user',JSON.stringify(value.user))
      }
    }).catch(err => {
      console.log('Something went wrong:', err.message);
    });
    }
    )


}

  logout() {
    this.firebaseAuth.signOut().then(() => {
      // localStorage.removeItem('user');
      // console.log('User signed out')
      this.router.navigate(['/']);
    });
  }



}
