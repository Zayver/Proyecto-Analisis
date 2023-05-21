import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerCommService {
  private worker!: Worker

  sub = new Subject<[number, number]>

  private dif = ""
  private maxPlayer = ""
  private minPlayer = ""

  readonly difName = [
    "Dummy", "Easy", "Medium", "Hard", "Impossible"
  ]

  constructor() { 
    this.createWorker()
  }

  private createWorker(){
    this.worker = new Worker(new URL('src/app/worker/game-worker.worker', import.meta.url))
    this.worker.addEventListener('message', ({data}) =>{
      this.sub.next(data)
    })
  }
  

  init(dif: string, max: string, min: string) {
    this.dif = dif
    this.maxPlayer = max
    this.minPlayer = min
  }

  play(squares: string[][]){
    this.worker.postMessage({
      dif: this.dif,
      max: this.maxPlayer,
      min: this.minPlayer,
      squares: squares
    })
  }

  stop(){
    this.worker.terminate()
    this.createWorker()
  }
}
