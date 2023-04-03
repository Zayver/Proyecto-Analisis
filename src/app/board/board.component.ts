import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'triqui-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent{


  @Input() player!: string
  @Input() xIsNext!: boolean
  @Output() xIsNextChange = new EventEmitter<boolean>()


  @Input() size!: number;
  @Input() squares!: string[]


  makeMove(id: number) {
    if (!this.squares[id]) {
      this.squares.splice(id, 1, this.player);
      this.xIsNextChange.emit(!this.xIsNext)
    }
  }



}
