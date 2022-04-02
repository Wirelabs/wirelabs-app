import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  //private baseUrl: string = 'http://localhost:3000/device/';
  private baseUrl = 'https://api.wirelabs.at/device/';

  constructor(private http: HttpClient) { }

  public getDevicesOfHub(hubId: string): Observable<any> {
    return this.http.post(this.baseUrl + 'get-hub-devices', { hubId });
  }

  public getAllDevices(): Observable<any> {
    return this.http.get(this.baseUrl + 'get-all-devices');
  }
}
