import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'triqui-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent {
  @Input() value!:string
  @Input() active!: boolean

  @Output() clickEvent = new EventEmitter()

  clickE(){
    this.clickEvent.emit()
  }

}
