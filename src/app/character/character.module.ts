import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterRoutingModule } from './character-routing.module';
import { CharacterComponent } from './character/character.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CharacterComponent
  ],
  imports: [
    CommonModule,
    CharacterRoutingModule,
    FormsModule,
  ]
})
export class CharacterModule { }
