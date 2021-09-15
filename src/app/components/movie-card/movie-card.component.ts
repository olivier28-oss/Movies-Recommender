import { Component, OnInit, Input } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: Movie = new Movie;

  rateUrl = 'http://127.0.0.1:5000/rateItem/';
  ratedValue = null;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  rateItem(movieName: any) {
    this.getrateItem(movieName).subscribe(
      (response: any[]) => console.log(response),
      (error) => console.log(error));
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
