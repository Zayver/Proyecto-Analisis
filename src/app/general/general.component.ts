import { Component } from '@angular/core';

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

  squares!: string[][];

  get player() {
    return this.xIsNext ? "X" : "O"
  }

  newGame() {
    this.playing = true
    this.winner = null;
    this.xIsNext = true;
    this.selectedSizeInternal = this.selectedSize
    this.selectedModeInternal = this.selectedMode
    this.fillSquares()
  }

  fillSquares(){
    this.squares = Array(this.selectedSizeInternal).fill(null)
    for(let i = 0; i< this.selectedSizeInternal; i++){
      this.squares[i] = Array(this.selectedSizeInternal**2).fill(null)      
    }
  }

}
