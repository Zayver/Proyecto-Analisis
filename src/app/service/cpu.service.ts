import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CpuService {

  constructor() { }


  play(squares: readonly string[][]): [number, number]{
    const size = squares.length
    let boardId = 0
    let id = 0
    do{
      boardId = this.getRand(size)
      id = this.getRand(size**2)
    }while(squares[boardId][id] !== null)
    return [boardId, id]
  }

  private getRand(max: number): number{
    return Math.floor(Math.random()*max)
  }
}
