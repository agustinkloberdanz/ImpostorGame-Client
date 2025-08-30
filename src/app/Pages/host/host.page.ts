import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { GameService } from 'src/app/Services/game-service';
import { AlertTools } from 'src/app/Tools/AlertTools';

@Component({
  selector: 'app-host',
  templateUrl: './host.page.html',
  styleUrls: ['./host.page.scss'],
  standalone: false
})
export class HostPage {

  constructor(private _gameService: GameService, private _toast: ToastController, private alertTools: AlertTools) { }

  playersQuantity: number = 0
  players: string[] = []

  startGame() {
    if (this.playersQuantity <= 0) {
      this.alertTools.presentToast('ERROR - Invalid players quantity', 2000);
    }

    else {
      this.alertTools.presentLoading('Starting game...');
      this._gameService.StartGame(this.playersQuantity).subscribe(
        (res: any) => {
          if (res.statusCode != 200) alert(res.message)
          else {
            this.players = []

            this.alertTools.presentToast('Game started successfully!', 2000)

            for (let i = 0; i < this.playersQuantity; i++) {
              this.players.push(`${i + 1}`)
            }
          }
          this.alertTools.dismissLoading();
        },
        (error: any) => {
          console.log(error.message)
          this.alertTools.dismissLoading();
        }
      )
    }
  }

  copyLink(id: string) {
    navigator.clipboard.writeText(`https://impostor-game-alpha.vercel.app/rol/${id}`);

    this.alertTools.presentToast('Link copied to clipboard', 2000);
  }
}
