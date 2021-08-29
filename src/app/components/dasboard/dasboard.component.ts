import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit {
  predictUrl = 'http://127.0.0.1:5000/predictions/';
  configGetUrl = 'http://127.0.0.1:5000/getUser/';
  commentUrl = 'http://127.0.0.1:5000/commentItem/';
  updateCommentScore = 'http://127.0.0.1:5000/updateScore/';
  movieCommentUrl = 'http://127.0.0.1:5000/getmovieComment/';
  movieInfo = 'http://127.0.0.1:5000/movieInfo/';
  moviedetails = 'http://127.0.0.1:5000/getRecentMovies';
  movieInfoArr:any[]=[]
  movieCommentInfo: any[] = [];
  fetchedMovie: any[] = [];
  commentValue = null;
  moviePoster = [];
  // movies: Array<Movie> = []
  recentMoviesArray: any[]=[];

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private movieService: MovieServiceService) {
    // this.movies = movieService.getMovies();
    this.recentMovies();
  }

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

  commentItem(movieName: any) {
    this.getcommentItem(movieName).subscribe(
      (response: any[]) => console.log(response),
      (error) => console.log(error));
  }


  updateComment(uid: any) {
    this.getupdateComment(uid).subscribe(
      (response: any[]) => console.log(response),
      (error) => console.log(error));
  }

  movieComment(uid:any) {
    this.getmovieComment(uid).subscribe(
      (response: any[]) => console.log(this.movieCommentInfo=response),
      (error) => console.log(error))
    }


    movieDetails(mname:any) {
      this.getmovieInfo(mname).subscribe(
        (response: any[]) => console.log(this.movieInfoArr=response),
        (error) => console.log(error))
      }

    getmovieComment(uid:any): Observable<any[]> {
      return this.http.get<any[]>(this.movieCommentUrl + uid)
    }

    recentMovies(){
      this.getRecentMovies().subscribe(
       (response: any[]) => console.log(this.recentMoviesArray = response),
       (error) => console.log(error));
      }

    getRecentMovies(): Observable<any[]> {
      return this.http.get<any[]>(this.moviedetails)
      }


getUsersResponse(uid: string): Observable<any[]> {
  return this.http.get<any[]>(this.configGetUrl + '\'' + uid + '\'')
}

getRecommendationsResponse(uid: any): Observable<any[]> {
  return this.http.get<any[]>(this.predictUrl + uid)
}

getcommentItem(movieName: any): Observable<any[]> {
  return this.http.get<any[]>(this.commentUrl + movieName + '/' + this.commentValue + '/' + this.authService.uid)
}

getupdateComment(uid: any): Observable<any[]> {
  return this.http.get<any[]>(this.updateCommentScore + uid)
}


getmovieInfo(mname: any): Observable<any[]> {
  return this.http.get<any[]>(this.movieInfo + mname)
}
// mPoster(searchQuery: string) {
//   this.movieService.getMovieId(searchQuery).subscribe((data:any)=>{
//       console.log(data.poster_path)
//       return data.poster_path;
//       // console.log(this.moviePoster)

//     });
// }

displayMovie(item: any){
this.updateComment(this.authService.uid)
let movies = item;
this.router.navigate(['/movie'], {state: { movieInfo: movies}})
return;
}

}
