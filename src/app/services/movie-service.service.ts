import { Injectable } from '@angular/core';
import { keys } from 'src/app/my-keys';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  private movies: Array<Movie>;
  moviedetails = 'http://127.0.0.1:5000/getRecentMovies';
  // moviedetails = 'https://api.themoviedb.org/3/movie/';
  movieUrlAPI = 'https://api.themoviedb.org/3/search/movie?api_key=';
  url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + `${keys.movieDB}`+ '&sort_by=popularity.desc';
  searchMovies: any[] = [];
  arrNameId: any[] = [];
  exactName: string='';
  movieId: string='';
  movieTitle: string='';

  constructor(private http: HttpClient) {
    this.movies = [];
    this.recentMovies(); // if recent movies section appeared forst, to use set Timer
  }

  addMovies(movie: Movie){
    this.movies.push(movie);
  }

  recentMovies(){
    this.getRecentMovies().subscribe(
     (response: any[]) => {
       for(const item of response){
        let movie: Movie = new Movie()
        movie.idMovie = item.idMovie;
        movie.movieName = item.movieName;
        movie.releaseYear = item.releaseYear;
        movie.runtime = item.runtime;
        movie.genres = item.genres;
        movie.actors = item.actors;
        movie.directors = item.directors;
        movie.poster = item.poster;
        movie.ratings = item.ratings;
        movie.voteCount = item.voteCount;
        movie.overview = item.overview;
        this.addMovies(movie);
       }


      },
      (error) => console.log(error));
    }

  getRecentMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.moviedetails)
    }


    getMovies(): Array<Movie>{
      return this.movies;
    }

  // search movies by name
  fetchMovie(searchQuery: string) {
    return this.http.get(`${this.movieUrlAPI}${keys.movieDB}&query=${searchQuery}`)
  }

  // return movie posters
  fetchMoviePoster(){
    return this.http.get(this.url);
    }

//   //
//   lookMovie(query: string) {
//     this.fetchMovie(query).subscribe((data:any)=>{
//         // console.log(data.results)
//         this.searchMovies = data.results;
//         for (var index of this.searchMovies){
//           this.arrNameId.push({"id":index.id ,"title":index.original_title});
//         }
// // console.log(this.arrNameId);

//       });
//       return this.arrNameId;
//   }

//   getId(query:string){
//   for(var ind of this.lookMovie(query)){
//     if(ind.title == query){
//       this.movieId = ind.id;
//       // console.log(ind.id);

//     }
//   }
//   return this.movieId
//   }

//   getMovieId(MovieName: string){
//   return this.http.get(`${this.moviedetails}${this.getId(MovieName)}?api_key=${keys.movieDB}`)

//   }

}
