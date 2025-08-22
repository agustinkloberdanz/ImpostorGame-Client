import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/Services/game-service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.page.html',
  styleUrls: ['./rol.page.scss'],
  standalone: false
})
export class RolPage {
  roles: string[] = [];
  playerIndex: number;
  playerRole: string;

  constructor(private _gameService: GameService, private route: ActivatedRoute) {
    this.playerIndex = Number(this.route.snapshot.paramMap.get('id'))
    this.playerRole = ''
  }

  ionViewWillEnter() {
    this._gameService.GetRoles().subscribe(
      (res: any) => {
        if (res.statudCode != 200) alert(res.message)
        else {
          this.roles = res.roles;
          this.playerRole = this.roles[this.playerIndex];
        }
      },
      (err: any) => {
        console.log(err.message)
      });
  }

}
