import { Component } from '@angular/core';
import { GameService } from 'src/app/Services/game-service';
import { AlertTools } from 'src/app/Tools/AlertTools';

@Component({
  selector: 'app-host',
  templateUrl: './host.page.html',
  styleUrls: ['./host.page.scss'],
  standalone: false
})
export class HostPage {

  constructor(private _gameService: GameService, private alertTools: AlertTools) { }

  playersQuantity: number = 0
  players: string[] = []

  async ionViewWillEnter() {
    await this.alertTools.presentLoading()
    this._gameService.GetRoles().subscribe(
      async (res: any) => {
        if (res.statusCode != 200) await this.alertTools.presentToast('Error al obtener la partida', 2000)
        else {
          const num = res.roles.length

          for (let i = 0; i < num; i++) {
            this.players.push(`${i + 1}`)
          }
        }

        await this.alertTools.dismissLoading()
      },
      async (error: any) => {
        console.log(error.message)
        await this.alertTools.dismissLoading();
      }
    )
  }

  async startGame() {
    if (this.playersQuantity <= 0) {
      this.alertTools.presentToast('ERROR - Invalid players quantity', 2000);
    }

    else {
      await this.alertTools.presentLoading('Starting game...');
      this._gameService.StartGame(this.playersQuantity).subscribe(
        async (res: any) => {
          if (res.statusCode != 200) alert(res.message)
          else {
            this.players = []

            await this.alertTools.presentToast('Game started successfully!', 2000)

            for (let i = 0; i < this.playersQuantity; i++) {
              this.players.push(`${i + 1}`)
            }
          }
          await this.alertTools.dismissLoading();
        },
        async (error: any) => {
          console.log(error.message)
          await this.alertTools.dismissLoading();
        }
      )
    }
  }

  async copyLink(id: string) {
    await navigator.clipboard.writeText(`https://impostor-game-alpha.vercel.app/rol/${id}`);

    await this.alertTools.presentToast('Link copied to clipboard', 2000);
  }
}
