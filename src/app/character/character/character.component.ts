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
    private rickService: RickService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.filterCharacter();
  }

  nextPage() {
    this.next++;
    this.filterCharacter();
  }

  previousPage() {
    if (this.next > 1) {
      this.next--;
      this.filterCharacter();
    }
  }

  get pages() {
    return this.rickService.pages;
  }

  getCharacter(id: number) {
    this.character$ = this.rickService.getCharacter(id);
  }

  filterCharacter() {
    this.characters$ = this.rickService.filterCharacter(this.search, this.next);
  }

  changeValueSearch() {
    this.next = 1;
    this.characters$ = this.rickService.filterCharacter(this.search, this.next);
  }
}
