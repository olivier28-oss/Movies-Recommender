import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'genres'
})
export class GenresPipe implements PipeTransform {

  transform(value: any): any {
    return null;
  }

}
