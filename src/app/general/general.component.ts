import { Component } from '@angular/core';
import { GameService } from '../service/game.service';
import { WorkerCommService } from '../service/worker-comm.service';

@Component({
  selector: 'triqui-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {

  xIsNext!: boolean;
  playing: boolean = false


  selectedSize: any; //number
  selectedMode: any; //string
  winner: any;
  selectedSizeInternal: any;
  selectedModeInternal: any;
  difOptions: any
  selectedDifficulty: any
  selectedDifficultyInternal: any

  squares: string[][] = [[]];

  active!: boolean
  get player() {
    return this.xIsNext ? "X" : "O"
  }
 

  constructor(private gameS: GameService, private workerS: WorkerCommService) {
    this.difOptions = this.workerS.difName
    this.workerS.sub.subscribe({next: ([boardId, id])=> this.CPUplay(boardId, id)})
  }

  get tie(){
    return this.gameS.tie(this.squares)
  }


  newGame() {
    //EN VS-PC "X" es el jugador "O" es pc
    this.playing = true
    this.winner = null;
    this.xIsNext = this.gameS.isXinit();
    this.active = true
    this.selectedSizeInternal = this.selectedSize
    this.selectedModeInternal = this.selectedMode
    this.fillSquares()
    this.workerS.stop()


    if (this.selectedModeInternal == "VS-PC") {
      this.workerS.init(this.selectedDifficulty, "O", "X")
      this.selectedDifficultyInternal = this.selectedDifficulty
      if(this.player == "O"){
        this.callWorker()
      }
    }
  }

  fillSquares() {
    this.squares = Array(this.selectedSizeInternal).fill(null)
    for (let i = 0; i < this.selectedSizeInternal; i++) {
      this.squares[i] = Array(this.selectedSizeInternal ** 2).fill(null)
    }
  }

  makeMove(id: number, boardId: number) {
    if (!this.squares[boardId][id]) {
      this.squares[boardId].splice(id, 1, this.player);
      this.winner = this.gameS.checkWinner(this.squares, id, boardId)
      if (this.winner) {
        this.active = false
        return
      }
      this.xIsNext = !this.xIsNext
    }

    if (this.tie) {
      this.active = false
      return
    }

    if (this.selectedModeInternal == "VS-PC" && this.player == "O") {
      this.callWorker()
    }
  }

  CPUplay(boardId: number, id: number) {
    this.squares[boardId].splice(id, 1, this.player)

    this.winner = this.gameS.checkWinner(this.squares, id, boardId)
    if (this.winner) {
      this.active = false
      return
    }
    this.xIsNext = !this.xIsNext

    if (this.tie) {
      this.active = false
    }else{
      this.active = true
    }
  }

  callWorker(){
    this.active = false
    this.workerS.play(this.squares)
  }


}
