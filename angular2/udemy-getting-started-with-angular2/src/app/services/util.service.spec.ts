/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UtilService } from './util.service';

describe('UtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilService]
    });
  });

  it('should ...', inject([UtilService], (service: UtilService) => {
    expect(service).toBeTruthy();
  }));
});
