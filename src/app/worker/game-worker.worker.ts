/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const cpu = new CPUWorker
  cpu.init(data.dif, data.max, data.min)
  postMessage(cpu.play(data.squares));
});


class CPUWorker{

  private maxDepth = 0
  private maxPlayer = ""
  private minPlayer = ""

  private readonly dif = [
    {
      name: "Dummy",
      depth: 0
    },
    {
      name: "Easy",
      depth: 1
    },
    {
      name: "Medium",
      depth: 3
    },
    {
      name: "Hard",
      depth: 5
    },
    {
      name: "Impossible",
      depth: 500
    }
  ]


  init(dif: string, max: string, min: string) {
    this.maxDepth = this.dif.find((t) => {
      return t.name == dif
    })!.depth
    this.maxPlayer = max
    this.minPlayer = min
  }

  play(squares: string[][]) : [number, number]{
    return this.maxDepth == 0 ? this.dummy(squares): this.ai(squares)
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

  
  private ai(squares: any[][]): [number, number]{
    let bestEval = Number.NEGATIVE_INFINITY;
    let bestMove: [number, number] = [-1, -1]

    squares.forEach((board, boardId, _) =>{
      board.forEach((value, valueId, _) =>{
        if(value === null){
          squares[boardId][valueId] = this.maxPlayer
          const evaluation = this.minimax(squares, this.maxDepth, false, boardId, valueId)
          squares[boardId][valueId] = null

          if(evaluation > bestEval){
            bestEval = evaluation
            bestMove = [boardId, valueId]
          }
        }
      })
    })
    return bestMove

  }

  private minimax(squares: any[][], depth: number, max: boolean,
    boardId: number, valueId: number): number {

    if(this.checkWinner(squares, valueId, boardId) !== null
      || depth === 0){
        return this.evaluate(squares, boardId, valueId)
    }

    let evaluate = 0

    if(max){
      evaluate = Number.NEGATIVE_INFINITY
      squares.forEach((board, boardId, _) =>{
        board.forEach((value, valueId, _) =>{
          if(value === null){
            squares[boardId][valueId] = this.maxPlayer
            const evaluation = this.minimax(squares, depth-1, false, boardId, valueId)
            squares[boardId][valueId] = null
            evaluate = Math.max(evaluate, evaluation)
          }
        })
      })
    }
    else{
      evaluate = Number.POSITIVE_INFINITY
      squares.forEach((board, boardId, _) =>{
        board.forEach((value, valueId, _) =>{
          if(value === null){
            squares[boardId][valueId] = this.minPlayer
            const evaluation = this.minimax(squares, depth-1, true, boardId, valueId)
            squares[boardId][valueId] = null
            evaluate = Math.min(evaluate, evaluation)
          }
        })
      })
    }
    return evaluate
  }


  private evaluate(squares: readonly any[][], boardId: number, valueId: number): number{
    const player = this.checkWinner(squares, valueId, boardId);
    if(player === this.maxPlayer){
      return 10
    }
    else if(player === this.minPlayer){
      return -10
    }
    else{
      return 0
    }
  }

  private checkWinner(squares: readonly string[][], id: number, boardId: number ): string | null{
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
  
}