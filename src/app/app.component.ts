import { Component, OnInit } from '@angular/core';
import { RickService } from './services/rick.service';
import { Character, Data } from './interfaces/rick.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Personajes de la serie "Rick And Morty"';
  character$!: Observable<Character>;
  characters$!: Observable<Character[]>;
  next = 1;

  constructor(private rick: RickService ) {}

  ngOnInit() {
    this.getAllCharacters();
  }

  pagesPlus() {
    this.next++;
    this.getAllCharacters();
  }

  pagesMinus() {
    if (this.next >= 1) {
      this.next--;
      this.getAllCharacters();
    }
  }

  getAllCharacters() {
    this.characters$ = this.rick.getAllCharacters(this.next);
  }

  getCharacter(id: number) {
    this.character$ = this.rick.getCharacter(id);
  }

  filterCharacter(name: string) {
    this.characters$ = this.rick.filterCharacter(name);
  }

}
