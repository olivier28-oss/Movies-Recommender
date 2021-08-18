import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})

export class MovieDetailsComponent implements OnInit {

  movieUrl = 'http://127.0.0.1:5000/predictMovies/';
  movieDetailsUrl = 'http://127.0.0.1:5000/movieInfo/';
  mov: any[] = [];
  details: any[] = [];

  constructor(private http: HttpClient, private router: Router) {

    const navigation = this.router.getCurrentNavigation();
    if(navigation){
      const state = navigation.extras.state as {
        movieInfo: string
      };
      if(state){
        this.predictMovies(state.movieInfo);
      }
    }


   }

  ngOnInit(): void { }

  predictMovies(movieDetails: any){
    this.getMovie(movieDetails).subscribe(
      (response: any[]) => console.log(this.movieUrl + movieDetails, this.mov = response),
      (error) => console.log(error));
    }

    movieInfo(details: any){
    this.getMovieDetails(details).subscribe(
     (response: any[]) => console.log(this.movieUrl + details, this.details = response),
      (error) => console.log(error));
    }

  getMovie(movieName: any): Observable<any[]> {
    return this.http.get<any[]>(this.movieUrl + movieName)
    }

  getMovieDetails(movieName: any): Observable<any[]> {
    return this.http.get<any[]>(this.movieDetailsUrl + movieName)
    }

  chooseMovie(item: any){
    let movies = item;
    this.router.navigate(['/movie'], {state: { movieInfo: movies}})
    return;
    }


      // To reload component
    // reloadCurrentRoute() {
    //   let currentUrl = this.router.url;
    //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //      this.router.navigate([currentUrl]);
    //     });
    // }

  }





