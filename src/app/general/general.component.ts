import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

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

  squares: string[][] = [[]];

  active!: boolean
  get player() {
    return this.xIsNext ? "X" : "O"
  }


  newGame() {
    this.playing = true
    this.winner = null;
    this.xIsNext = true;
    this.active = true
    this.selectedSizeInternal = this.selectedSize
    this.selectedModeInternal = this.selectedMode
    this.fillSquares()
  }

  fillSquares() {
    this.squares = Array(this.selectedSizeInternal).fill(null)
    for (let i = 0; i < this.selectedSizeInternal; i++) {
      this.squares[i] = Array(this.selectedSizeInternal ** 2).fill(null)
    }
  }


  checkWinner() {
    //BRUTE FORCE ALGORITHM
    //Check 2d board
    //DEBERIA IR ESTO EN UN SERVICIO
    for (let layer = 0; layer < this.selectedSizeInternal; layer++) {
      let rowIndex = this.selectedSizeInternal;
      do {
        const arr = this.squares[layer].slice(rowIndex - this.selectedSizeInternal, rowIndex)
        if(this.squares[layer][rowIndex - this.selectedSizeInternal]!=""){
          if(arr.every(v=>v===this.player)){
            return this.player
          }
        }
        rowIndex += this.selectedSizeInternal;
      } while (rowIndex !== this.selectedSizeInternal ** 2);

      for(let columnIndex = 0; columnIndex<this.selectedSizeInternal;columnIndex++){
        const arr = this.squares[layer].filter( (v, i) => i%this.selectedSizeInternal==columnIndex)
        if(this.squares[layer][columnIndex]!==""){
          if(arr.every(v=>v===this.player)){
            return this.player
          }
        }
      }

      {
        const arr = this.squares[layer].filter( (v, i) => i%(this.selectedSizeInternal+1)==0)
        if(this.squares[layer][0]!==""){
          if(arr.every(v=>v===this.player)){
            return this.player
          }
        }
      }
      let accum = 0
      for(let index = this.selectedSizeInternal-1 ; index<=(this.selectedSizeInternal**2)-this.selectedSizeInternal; index+=this.selectedSizeInternal-1){
        if(this.squares[layer][index]===this.player){
          accum+=1
        }
      }
      if(accum===this.selectedSizeInternal){
        return this.player
      }
    }

    //Check 3d column
    for(let index=0; index<(this.selectedSizeInternal**2); index++){
      let accum = 0
      for(let layer = 0; layer < this.selectedSizeInternal; layer++){
        if(this.squares[layer][index] === this.player){
          accum+=1
        }
      }
      if(accum==this.selectedSizeInternal){
        return this.player
      }
    }

    //check 3d column diagonal
    for(let rowIndex=0; rowIndex !== (this.selectedSizeInternal ** 2); rowIndex+=this.selectedSizeInternal){
      let accum = 0
      for(let columnIndex = 0; columnIndex < this.selectedSizeInternal; columnIndex++ ){
        console.log(rowIndex+"-"+(rowIndex+columnIndex)+"\n\n")
        if(this.squares[columnIndex][rowIndex+columnIndex] === this.player){
          accum+=1
        }
      }
      if(accum===this.selectedSizeInternal){
        return this.player
      }
    }

    //check 3d row diagonal
    for(let columnIndex = 0; columnIndex< this.selectedSizeInternal; columnIndex++){
      let accum = 0
      for(let rowIndex = 0, layer = 0; rowIndex < (this.selectedSizeInternal ** 2); rowIndex+=this.selectedSizeInternal, layer ++){
        if(this.squares[layer][columnIndex+rowIndex] === this.player){
          accum+=1
        }
      }
      if(accum===this.selectedSizeInternal){
        return this.player
      }
    }
    //check 3d diagonal
    let accumD = 0
    for(let layer=0, index=0; layer<this.selectedSizeInternal; layer++, index+=this.selectedSizeInternal+1){
      if(this.squares[layer][index]===this.player){
        accumD++
      }
    }
    if(accumD===this.selectedSizeInternal){
      return this.player
    }
    accumD = 0
    for(let layer=0, index = this.selectedSizeInternal-1 ; index<=(this.selectedSizeInternal**2)-this.selectedSizeInternal; index+=this.selectedSizeInternal-1, layer++){
      if(this.squares[layer][index]===this.player){
        accumD+=1
      }
    }
    if(accumD===this.selectedSizeInternal){
      return this.player
    }
    return null
  }

  makeMove(id: number, boardId: number) {
    if (!this.squares[boardId][id]) {
      this.squares[boardId].splice(id, 1, this.player);
      this.winner = this.checkWinner()
      if (this.winner) {
        this.active = false
        return
      }
      this.xIsNext = !this.xIsNext
    }

    if (this.selectedModeInternal == "VS-PC" && this.player == "O") {
      this.active = false
      //TODO THIS IS FOR DEMONSTRATION
      this.CPUplay()
      this.checkWinner()
      this.active = true
    }
  }

  CPUplay() {
    throw new Error('Method not implemented.');
  }


}
