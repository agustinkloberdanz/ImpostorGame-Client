import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/Services/game-service';
import { AlertTools } from 'src/app/Tools/AlertTools';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.page.html',
  styleUrls: ['./rol.page.scss'],
  standalone: false
})
export class RolPage {
  playerIndex: number;
  playerRole: string;

  constructor(private _gameService: GameService, private route: ActivatedRoute, private alertTools: AlertTools) {
    this.playerIndex = Number(this.route.snapshot.paramMap.get('id'))
    this.playerRole = ''
  }

  ionViewWillEnter() {
    this.alertTools.presentLoading('Obteniendo jugador');
    this._gameService.GetRoles().subscribe(
      (res: any) => {
        if (res.statusCode != 200) alert(res.message)
        else this.playerRole = res.roles[this.playerIndex - 1]

        this.alertTools.presentToast('Player updated', 2000);
        this.alertTools.dismissLoading();
      },
      (err: any) => {
        console.log(err.message)
        this.alertTools.dismissLoading();
      });
  }

  reload() {
    this.ionViewWillEnter();
  }
}
