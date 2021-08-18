import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit {
  predictUrl = 'http://127.0.0.1:5000/predictions/';
  configGetUrl = 'http://127.0.0.1:5000/getUser/';
  rateUrl = 'http://127.0.0.1:5000/rateItem/';
  fetchedMovie: any[] = [];
  ratedValue = null;


  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => this.getUser(this.authService.uid), 2000 );
  }

  getUser(uid: string) {
    this.getUsersResponse(uid).subscribe(
      (response: any[]) => this.getRecommendations(response[0]),
      (error) => console.log(error)
    );
  }

  getRecommendations(uid: any) {
    this.getRecommendationsResponse(uid).subscribe(
      (response: any[]) => console.log(this.predictUrl + uid, this.fetchedMovie = response),
      (error) => console.log(error)
    );
  }

  rateItem(movieName: any) {
    this.getrateItem(movieName).subscribe(
      (response: any[]) => console.log(response),
      (error) => console.log(error));
  }


getUsersResponse(uid: string): Observable<any[]> {
  return this.http.get<any[]>(this.configGetUrl + '\'' + uid + '\'')
}

getRecommendationsResponse(uid: any): Observable<any[]> {
  return this.http.get<any[]>(this.predictUrl + uid)
}

getrateItem(movieName: any): Observable<any[]> {
  return this.http.get<any[]>(this.rateUrl + movieName + '/' + this.ratedValue + '/' + this.authService.uid)
}

displayMovie(item: any){
let movies = item;
this.router.navigate(['/movie'], {state: { movieInfo: movies}})
return;
}

}
