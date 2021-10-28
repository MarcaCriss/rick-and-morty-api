import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Character, Data } from '../interfaces/rick.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RickService {
  constructor(private http: HttpClient) {}

  getAllCharacters(page?: number): Observable<Character[]> {
    return this.http
      .get<Data>(`${environment.urlBase}character/?page=${page}`)
      .pipe(
        map((data: Data) => {
          return data.results;
        })
      );
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${environment.urlBase}character/${id}`);
  }

  filterCharacter(name: string): Observable<Character[]> {
    return this.http.get<Data>(`${environment.urlBase}character/?name=${name}`)
    .pipe(
      map((data: Data) => {
        return data.results;
      })
    );
  }
}
