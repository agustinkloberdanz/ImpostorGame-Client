import { Injectable } from '@angular/core';
import { MainService } from './main-service';

@Injectable({
  providedIn: 'root'
})
export class GameService extends MainService {

  public StartGame(playersQuantity: number) {
    return this.http.get(`${this.API_URL}/start/${playersQuantity}`)
  }

  public GetRoles() {
    return this.http.get(`${this.API_URL}/getRoles`)
  }
}
