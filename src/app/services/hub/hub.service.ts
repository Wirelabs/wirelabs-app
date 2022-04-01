import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HubService {
  //private baseUrl : string = 'http://localhost:3000/hub/';
  private baseUrl =
    'https://aws.wirelabs.at/hub/';

  constructor(private http: HttpClient) {}

  public getUserHubs(): Observable<any> {
    console.log(this.baseUrl);
    return this.http.get(this.baseUrl + 'get-user-hubs');
  }

  public generateNewHub(_id: string, name: string): Observable<any> {
    return this.http.post(this.baseUrl + 'generate-new-hub', {
      name,
      _id,
    });
  }

  public updateHub(_id: string, updateBody: any): Observable<any> {
    return this.http.put(this.baseUrl + 'update-hub', {
      _id,
      update: updateBody,
    });
  }
}
