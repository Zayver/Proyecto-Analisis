import { Component, Input } from '@angular/core';

@Component({
  selector: 'triqui-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent {
  @Input() value!:string

}
