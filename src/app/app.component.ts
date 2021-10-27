import { Component, OnInit } from '@angular/core';
import { RickService } from './services/rick.service';
import { Character } from './interfaces/rick.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'rick-and-morty-api';
  characters: Character[] = [];
  character!: Character;

  constructor(private rick: RickService) {}

  ngOnInit() {
    this.rick.getAllCharacters().subscribe(
      (data: any) => {
        this.characters = data.results;
      }
    );
  }

  getCharacter(id: number) {
    this.rick.getCharacter(id).subscribe(
      (data: any) => {
        this.character = data
      }
    )
  }

  filterCharacter(name: string) {

  }
}
