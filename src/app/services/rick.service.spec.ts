import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { RickService } from './rick.service';
import { environment } from './../../environments/environment';
import { CharacterList } from '../__mocks__/characterList.mock';
import { Response } from '../__mocks__/response.mock';
import { Character } from '../__mocks__/character.mock';

describe('RickService', () => {
  let service: RickService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RickService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('deberia ser creado', (done) => {
    expect(service).toBeTruthy();
    done();
  });

  it('deberia retornar un Observable<Character[]>', (done) => {
    service.filterCharacter('', 1).subscribe((data) => {
      expect(data).toEqual(CharacterList);
    });
    const testRequest = httpTestingController.expectOne(
      `${environment.urlBase}character/?page=1&name=`
    );
    testRequest.flush(Response);
    done();
  });

  it('deberia retornar un Observable<Character>', (done) => {
    service.getCharacter(1).subscribe((data) => {
      expect(data).toEqual(Character);
    });
    const testRequest = httpTestingController.expectOne(
      `${environment.urlBase}character/1`
    );
    testRequest.flush(Character);
    done();
  });
});
