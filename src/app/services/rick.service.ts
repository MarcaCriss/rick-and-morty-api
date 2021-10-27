import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Data } from '../interfaces/rick.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickService {

  constructor(private http: HttpClient) { }

  getAllCharacters() {
    return this.http.get(environment.urlBase + 'character');
  }

  getCharacter(id: number) {
    return this.http.get(`${environment.urlBase}character/${id}`);
  }

  filterCharacter(name: string) {
    return this.http.get(`${environment.urlBase}character`)
  }
}
