import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() {}


  /**
   * Check if a move made the board have a winner
   * @param squares 
   * @param id 
   * @param boardId 
   * @returns 
   */
  checkWinner(squares: readonly string[][], id: number, boardId: number ): string | null{
    const player = squares[boardId][id];
    const size = Math.sqrt(squares[0].length)
    
    //check 2d board
    const column = id%size
    let arr = squares[boardId].filter( (v, i) => i%size==column)
    if(arr.every(v=>v===player)){
      return player
    }
    const row = Math.floor(id/size)*size
    arr = squares[boardId].slice(row, row+size)
    if(arr.every(v=>v===player)){
      return player
    }

    //check diagonal if possible
    if(id % (size+1) === 0 || id%(size-1) === 0){
      arr = squares[boardId].filter((v, i) => i%(size+1) === 0)
      if(arr.every(v=>v===player)){
        return player
      }
      arr = squares[boardId].filter((v,i) => i%(size-1) === 0 && i !== (size**2-1) && i !== 0 )
      if(arr.every(v=>v===player)){
        return player
      }
    }

    //check 3d
    //check column
    arr = squares.map((v, i) =>{
      return squares[i][id]
    })
    if(arr.every(v=>v===player)){
      return player
    }

    //check 3d row left-right
    arr = squares.map((v,i) => {
      return squares[i][row+i]
    })
    if(arr.every(v=>v===player)){
      return player
    }

    //check 3d row right-left
    arr = squares.map((v,i)=>{
      return squares[size-1-i][row+i]
    })
    if(arr.every(v=>v===player)){
      return player
    }

    //check 3d column up to down
    arr = squares.map((v, i) =>{
      return squares[i][column+(size*i)]
    })
    if(arr.every(v=>v===player)){
      return player
    }

    arr = squares.map((v, i) =>{
      return squares[size-1-i][column+(size*i)]
    })
    if(arr.every(v=>v===player)){
      return player
    }

    //check diagonal if possible 3d
    if(id % (size+1) === 0 || id%(size-1) === 0){
      arr = squares.map((v, i) => {
        return squares[i][size*i+(i%size)]
      })
      if(arr.every(v=>v===player)){
        return player
      }

      arr = squares.map((v, i) =>{
        return squares[i][(size-1)+(size-1)*i]
      })
      if(arr.every(v=>v===player)){
        return player
      }

      arr = squares.map((v, i) => {
        return squares[i][size*(size-1)- i*(size-1)]
      })
      if(arr.every(v=>v===player)){
        return player
      }

      arr = squares.map((v, i) => {
        return squares[i][((size*size)-1) - i*(size+1)]
      })
      if(arr.every(v=>v===player)){
        return player
      }
    }
    return null
  }

  isXinit (){
    let start = Math.floor(Math.random()*2) 
    return start === 0
  }

  tie(squares: readonly string[][]) {
    return squares.every((v) => v.every((w) => w !== null))
  }

}
