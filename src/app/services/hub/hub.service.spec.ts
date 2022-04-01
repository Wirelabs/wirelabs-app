import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HubService } from './hub.service';

describe('HubService', () => {
  let service: HubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(HubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
