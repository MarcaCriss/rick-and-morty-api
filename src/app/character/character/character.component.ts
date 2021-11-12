import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { RickService } from './../../services/rick.service';
import { Character } from './../../interfaces/rick.interface';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit {
  title = 'Personajes de la serie "Rick And Morty"';
  character$!: Observable<Character>;
  characters$!: Observable<Character[]>;
  next = 1;
  search = '';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(
    Breakpoints.Handset
  ).pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private rick: RickService,
    private breakpointObserver: BreakpointObserver
  ) {}

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
