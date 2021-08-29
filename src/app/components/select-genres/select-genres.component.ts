import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SignupComponent } from '../signup/signup.component';


@Component({
  selector: 'app-select-genres',
  templateUrl: './select-genres.component.html',
  styleUrls: ['./select-genres.component.scss']
})
export class SelectGenresComponent implements OnInit {

  genresUrl = 'http://127.0.0.1:5000/selectGenres/';
  genres: any = [];
  selectedItemsList: any = [];
  user: any;

  constructor(private http: HttpClient, private signUserGenre: SignupComponent, public authService: AuthService) {
    this.getGenres();
    // this.user = this.authService.firebaseAuth.currentUser;
  }

  ngOnInit(): void { }

  getGenres(){
    this.http.get('../../assets/allGenres.json').subscribe(
      data => {
        // console.log(data);
        this.genres = data;
      });
  }

  changeSelection() {
    this.fetchSelectedItems();
    this.selectedItemsList.forEach((value, index) => {
      this.selectGenres(value.genresName)
      // if (value.genresName) {
      //   this.checkedIDs.push(value.id);
      // }
    });
    console.log(this.selectedItemsList);
    // console.log(this.authService.authStatusListener());

  }

  fetchSelectedItems() {
    this.selectedItemsList = this.genres.filter((value, index) => {
      return value.isChecked
    });
  }


  selectGenres(genresName: any) {
    this.getselectGenres(genresName).subscribe(
      (response: any[]) => console.log(response),
      (error) => console.log(error));
  }

  getselectGenres(genresName: any): Observable<any[]> {
    return this.http.get<any[]>(this.genresUrl + genresName + '/' + this.signUserGenre.uid)
  }

}
