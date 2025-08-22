import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  API_URL: string = 'https://impostorgame20250822121750-csffbzhubmhef7h3.brazilsouth-01.azurewebsites.net'

  constructor(public http: HttpClient) { }

  public StartGame(playersQuantity: number) {
    return this.http.get(`${this.API_URL}/start/${playersQuantity}`)
  }

  public GetRoles() {
    return this.http.get(`${this.API_URL}/getRoles`)
  }
}
