import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss'],
})
export class DasboardComponent implements OnInit {
  predictUrl = 'http://127.0.0.1:5000/predictions/';
  configGetUrl = 'http://127.0.0.1:5000/getUser/';
  commentUrl = 'http://127.0.0.1:5000/commentItem/';
  updateCommentScore = 'http://127.0.0.1:5000/updateScore/';
  movieCommentUrl = 'http://127.0.0.1:5000/getmovieComment/';
  movieInfo = 'http://127.0.0.1:5000/movieInfo/';
  moviedetails = 'http://127.0.0.1:5000/getRecentMovies';
  userGenresUrl = 'http://127.0.0.1:5000/getGenresName/';
  posterUrl = 'http://127.0.0.1:5000/getPoster/';

  warFamUrl='http://127.0.0.1:5000/newUserpredictions/';
  warFamArr: any[] = [];
  movieInfoArr: any[] = [];
  movieCommentInfo: any[] = [];
  genresNameArray: any[] = [];
  fetchedMovie: any[] = [];
  commentValue = null;
  recentMoviesArray: any[] = [];
  img:any;
  movies$: Array<Movie> | undefined;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private movieService: MovieServiceService
  ) {
    // this.movies = movieService.getMovies();
    // this.recentMovies();
    this.movieByGenre();
  }

  ngOnInit() {
    setTimeout(() => this.getUser(this.authService.uid), 2000);
  }

  // get list of movies for a specific user
  getUser(uid: string) {
    this.getUsersResponse(uid).subscribe(
      (response: any[]) => {
        this.getRecommendations(response[0]);
        this.userGenres(response[0]);
        console.log(response[0]);

      },
      (error) => console.log(error)
    );
  }

  // get list of recommended movies
  getRecommendations(uid: any) {
    this.getRecommendationsResponse(uid).subscribe(
      (response: any[]) =>
        console.log(this.predictUrl + uid, (this.fetchedMovie = response)),
      (error) => console.log(error)
    );
  }


  commentItem(movieName: any) {
    this.getcommentItem(movieName).subscribe(
      (response: any[]) => console.log(response),
      (error) => console.log(error)
    );
  }

  updateComment(uid: any) {
    this.getupdateComment(uid).subscribe(
      (response: any[]) => console.log(response),
      (error) => console.log(error)
    );
  }

  movieComment(uid: any) {
    this.getmovieComment(uid).subscribe(
      (response: any[]) => console.log((this.movieCommentInfo = response)),
      (error) => console.log(error)
    );
  }

  movieDetails(mname: any) {
    this.getmovieInfo(mname).subscribe(
      (response: any[]) => console.log((this.movieInfoArr = response)),
      (error) => console.log(error)
    );
  }

  getmovieComment(uid: any): Observable<any[]> {
    return this.http.get<any[]>(this.movieCommentUrl + uid);
  }

  // mPoster(mname: any) {
  //   this.getPoster(mname).subscribe(
  //     (response) => console.log(response)

  //   );
  // }

  // getImage(mname: any): string{
  //   this.img = this.mPoster(mname);
  //   return `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${this.img}`;
  // }

  // getPoster(mname: any): Observable<any[]> {
  //   return this.http.get<any[]>(this.posterUrl + mname);
  // }

// return list of most recent movies
  recentMovies() {
    this.getRecentMovies().subscribe(
      (response: any[]) => console.log((this.movies$ = response)),
      (error) => console.log(error)
    );
  }

  // list of movies by genres for specific user
  movieByGenre() {
    this.getRecentMovies().subscribe(
      (response: any[]) => console.log((this.recentMoviesArray = response)),
      (error) => console.log(error)
    );
  }

  // genresNames() {
  //   this.getGenresName().subscribe(
  //     (response: any[]) => console.log((this.genresNameArray = response)),
  //     (error) => console.log(error)
  //   );
  // }


  userGenres(uid:any){
    this.getmovieByGenre(uid).subscribe(
      (response: any[]) =>
        {
          console.log((this.genresNameArray = response))
          // console.log(response);

        },
      (error) => console.log(error)
    );
  }

  getmovieByGenre(uid:any): Observable<any[]> {
    return this.http.get<any[]>(this.userGenresUrl + uid);
  }


  // getGenresName(): Observable<any[]> {
  //   return this.http.get<any[]>(this.userGenresUrl + this.authService.uid);
  // }

  getRecentMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.moviedetails);
  }

  getUsersResponse(uid: string): Observable<any[]> {
    return this.http.get<any[]>(this.configGetUrl + "'" + uid + "'");
  }

  getRecommendationsResponse(uid: any): Observable<any[]> {
    return this.http.get<any[]>(this.predictUrl + uid);
  }

  getcommentItem(movieName: any): Observable<any[]> {
    return this.http.get<any[]>(
      this.commentUrl +
        movieName +
        '/' +
        this.commentValue +
        '/' +
        this.authService.uid
    );
  }

  getupdateComment(uid: any): Observable<any[]> {
    return this.http.get<any[]>(this.updateCommentScore + uid);
  }

  getmovieInfo(mname: any): Observable<any[]> {
    return this.http.get<any[]>(this.movieInfo + mname);
  }
  // mPoster(searchQuery: string) {
  //   this.movieService.getMovieId(searchQuery).subscribe((data:any)=>{
  //       console.log(data.poster_path)
  //       return data.poster_path;
  //       // console.log(this.moviePoster)

  //     });
  // }

  displayMovie(item: any) {
    this.updateComment(this.authService.uid);
    this.router.navigate(['/movie'], { state: { movieInfo: item } });
    return;
  }





  // warFam() {
  //   this.getWarFam().subscribe(
  //     (response: any[]) => console.log(this.warFamArr=response),
  //     (error) => console.log(error)
  //   );
  // }

  // getWarFam(): Observable<any[]> {
  //   return this.http.get<any[]>(this.warFamUrl);
  // }
}
