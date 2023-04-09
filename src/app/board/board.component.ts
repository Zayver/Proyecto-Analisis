import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//Board component
@Component({
  selector: 'triqui-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent{


  @Input() size!: number;
  @Input() squares!: string[]

  @Input() active!: boolean

  @Input() boardId!: number

  @Output() makeMoveEvent = new EventEmitter<{id: number, boardId: number}>()


  callMakeMove(id: number){
    this.makeMoveEvent.emit({id: id, boardId: this.boardId})
  }




}
