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
  pages = 0;

  constructor(private http: HttpClient) {}

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${environment.urlBase}character/${id}`);
  }

  filterCharacter(name = '', page: number): Observable<Character[]>{
    return this.http.get<Data>(`${environment.urlBase}character/?page=${page}&name=${name}`)
    .pipe(
      map((data: Data) => {
        this.pages = data.info.pages;
        return data.results;
      })
    );
  }
}
