import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class QrService {
    private baseUrl: string = 'http://localhost:3000/qr/';
    //private baseUrl = 'https://api.wirelabs.at/qr/';

    constructor(private http: HttpClient) {}

    public generateQrCode(
        hubs: any,
        maxActivations: number,
        expiresOn: string
    ): Observable<any> {
        return this.http.post(this.baseUrl + 'generate-qr-code', {
            hubs: hubs,
            maxActivations: maxActivations,
            expiresOn: expiresOn,
        });
    }

    public checkQrCode(id: string): Observable<any> {
        return this.http.post(this.baseUrl + 'check-qr-code', { _id: id });
    }
}
