import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    protected API_URL = 'https://impostorgame20250822121750-csffbzhubmhef7h3.brazilsouth-01.azurewebsites.net'

    constructor(protected http: HttpClient) { }

    protected CreateHeaders() {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }
}
