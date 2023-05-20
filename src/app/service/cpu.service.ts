import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CpuService {

  private maxDepth = 0
  private maxPlayer = ""

  private readonly dif = [
    {
      name: "Dummy",
      depth: 0
    },
    {
      name: "Easy",
      depth: 3
    },
    {
      name: "Medium",
      depth: 10
    },
    {
      name: "Hard",
      depth: 18
    },
    {
      name: "Impossible",
      depth: Infinity
    }
  ]

  readonly difName = [
    "Dummy", "Easy", "Medium", "Hard", "Impossible"
  ]

  constructor() { }

  init(dif: string, max: string) {
    this.maxDepth = this.dif.find((t) => {
      return t.name == dif
    })!.depth
    this.maxPlayer = max
  }

  play(squares: readonly string[][]) : [number, number]{
    return this.maxDepth == 0 ? this.dummy(squares): this.minimax(squares)
  }

  private dummy(squares: readonly string[][]): [number, number] {
    const size = squares.length
    let boardId = 0
    let id = 0
    do {
      boardId = this.getRand(size)
      id = this.getRand(size ** 2)
    } while (squares[boardId][id] !== null)
    return [boardId, id]
  }

  private getRand(max: number): number {
    return Math.floor(Math.random() * max)
  }


  private minimax(squares: readonly string[][]): [number, number] {



    //placeholder
    return [0,0]
  }
}
