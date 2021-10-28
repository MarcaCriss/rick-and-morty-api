import { Component, OnInit } from '@angular/core';
import { RickService } from './services/rick.service';
import { Character } from './interfaces/rick.interface';
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
  search = '';

  constructor(private rick: RickService ) {}

  ngOnInit() {
    this.filterCharacter();
  }

  pagesPlus() {
    this.next++;
    this.filterCharacter();
  }

  pagesMinus() {
    if (this.next > 1) {
      this.next--;
      this.filterCharacter();
    }
  }

  get pages() {
    return this.rick.pages;
  }

  getCharacter(id: number) {
    this.character$ = this.rick.getCharacter(id);
  }

  filterCharacter() {
    this.characters$ = this.rick.filterCharacter(this.search, this.next);
  }

  changeValueSearch() {
    this.next = 1;
    this.characters$ = this.rick.filterCharacter(this.search, this.next);
  }

}
