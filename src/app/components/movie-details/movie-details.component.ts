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
  movieDetailsUrl = 'http://127.0.0.1:5000/getMovieDetails/';
  movieCommentsUrl = 'http://127.0.0.1:5000/getmovieComment/';

  relatedMovies: any[] = [];
  movieComments: any[] = [];
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

  ngOnInit(): void {
   }

  predictMovies(movieDetails: any){
    this.getMovie(movieDetails).subscribe(
      (response: any[]) => {
        console.log(this.movieUrl + movieDetails, this.relatedMovies = response)
        this.movieInfo(movieDetails)
      },
      (error) => console.log(error));
    }


  moviesComments(movieName: any){
    this.getMovieComments(movieName).subscribe(
      (response: any[]) => console.log(response),
       (error) => console.log(error));

  }

    movieInfo(mname: any){
    this.getMovieDetails(mname).subscribe(
     (response: any[]) => console.log(this.details = response),
      (error) => console.log(error));
    }


  getMovie(movieName: any): Observable<any[]> {
    return this.http.get<any[]>(this.movieUrl + movieName)
    }

  getMovieDetails(movieName: any): Observable<any[]> {
    return this.http.get<any[]>(this.movieDetailsUrl + movieName)
    }

    getMovieComments(movieName: any): Observable<any[]> {
      return this.http.get<any[]>(this.movieCommentsUrl + movieName)
      }

  chooseMovie(item: any){
    console.log("Learn more clicked");
    this.router.navigate(['/movie'], {state: { movieInfo: item}})
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





