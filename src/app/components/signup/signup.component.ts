import { Component, OnInit, Input } from '@angular/core';
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


  public uid: string='';
  configUrl = 'http://127.0.0.1:5000/createUser/';
  fName = null;
  lName = null;
  mail = null;
  dob = null;
  email: string = '';
  password: string = '';
  genresUrl = 'http://127.0.0.1:5000/selectGenres/';
  genres: any = [];
  selectedItemsList: any = [];

  constructor(public authService: AuthService, private http: HttpClient) {
    // this.uid = this.authService.currentUser
    this.getGenres();
   }

  ngOnInit() { }

  signup(mail: string, pwd: string) {
    this.authService.firebaseAuth.createUserWithEmailAndPassword(mail, pwd).then(value => {
  //  if successfully create user in firebase. only email and password were enabled.
      if(value.user != null){
        this.createInternalUser(value.user.uid);
        console.log('Success!', value);
        this.uid=value.user.uid;
        this.selectedItemsList.forEach((genre) => {
          this.selectGenres(genre.genresName, `${this.uid}`)

        });
        console.log(value.user.uid);
      }
    }).catch(err => {
      console.log('Something went wrong:', err.message);
    });
  }

  createInternalUser(uid: string) {
    this.getcreateInternalUser(uid).subscribe(
      (response: any[]) => console.log('user inserted in database',response),
      (error) => console.log(error)
    );
  }

getcreateInternalUser(uid: string): Observable<any> {
  return this.http.get<any>(this.configUrl + this.fName + '/' + this.lName + '/' + this.mail + '/' + this.dob + '/' + uid)
}


 register(email: string, password: string) {
    this.email = email;
    this.password = password;
    this.signup(this.email, this.password);
    this.email = this.password = '';
    this.changeSelection();
  }

  getGenres(){
    this.http.get('../../assets/allGenres.json').subscribe(
      data => {
        // console.log(data);
        this.genres = data;
      });
  }

  changeSelection() {
    this.fetchSelectedItems();

    console.log(this.selectedItemsList);
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.genres.filter((value) => {
      return value.isChecked
    });
  }


  selectGenres(genresName: any, uid:any) {
    this.getselectGenres(genresName, uid).subscribe(
      (response: any[]) => console.log(response),
      (error) => console.log(error));
  }

  getselectGenres(genresName: any, uid:any): Observable<any[]> {
    return this.http.get<any[]>(this.genresUrl + genresName + '/' + uid)
  }

}
