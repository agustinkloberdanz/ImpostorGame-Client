import { Component } from '@angular/core';
import { GameService } from 'src/app/Services/game-service';

@Component({
  selector: 'app-host',
  templateUrl: './host.page.html',
  styleUrls: ['./host.page.scss'],
  standalone: false
})
export class HostPage {

  constructor(private _gameService: GameService) { }

  playersQuantity: number = 0
  players: string[] = []

  startGame() {
    if (this.playersQuantity <= 0) return alert('ERROR - Invalid players quantity')

    this._gameService.StartGame(this.playersQuantity).subscribe(
      (res: any) => {
        if (res.statusCode != 200) alert(res.message)
        else {
          alert('Game started successfully')

          for(let i = 0; i < this.playersQuantity; i++) {
            this.players.push(`${i + 1}`)
          }

          console.log(this.players)
        }
      },
      (error: any) => {
        console.log(error.message)
      }
    )
  }

  copyLink(id: string) {
    navigator.clipboard.writeText(`http://localhost:8100/${id}`);
  }
}
