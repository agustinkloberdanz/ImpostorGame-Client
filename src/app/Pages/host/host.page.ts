import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { GameService } from 'src/app/Services/game-service';

@Component({
  selector: 'app-host',
  templateUrl: './host.page.html',
  styleUrls: ['./host.page.scss'],
  standalone: false
})
export class HostPage {

  constructor(private _gameService: GameService, private _toast: ToastController) { }

  playersQuantity: number = 0
  players: string[] = []

  startGame() {
    if (this.playersQuantity <= 0) {
      this._toast.create({
        message: "ERROR - Invalid players quantity",
        duration: 2000,
        position: 'bottom'
      }).then(toast => toast.present());
    }

    else {
      this._gameService.StartGame(this.playersQuantity).subscribe(
        (res: any) => {
          if (res.statusCode != 200) alert(res.message)
          else {
            this.players = []
            this._toast.create({
              message: "Game started successfully!",
              duration: 2000,
              position: 'bottom'
            }).then(toast => toast.present());

            for (let i = 0; i < this.playersQuantity; i++) {
              this.players.push(`${i + 1}`)
            }
          }
        },
        (error: any) => {
          console.log(error.message)
        }
      )
    }
  }

  copyLink(id: string) {
    navigator.clipboard.writeText(`https://impostor-game-alpha.vercel.app/rol/${id}`);

    this._toast.create({
      message: "Link copied to clipboard",
      duration: 2000,
      position: 'bottom'
    }).then(toast => toast.present());
  }
}
