import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class McuService {
  private baseUrl = 'http://10.10.10.1:80/';

  constructor(private http: HttpClient) {}

  public sendWifiInformation(
    ssid: string,
    password: string,
    id: string
  ): AxiosPromise<any> {
    const data =
      '{"ssid":"' +
      ssid +
      '","password":"' +
      password +
      '","hub":"' +
      id +
      '"}';

    const config: AxiosRequestConfig = {
      method: 'post',
      url: this.baseUrl + 'save-credentials',
      headers: {},
      responseType: 'text',
      data,
    };

    return axios(config);
  }
}
