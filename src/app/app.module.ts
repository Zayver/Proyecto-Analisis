import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneralComponent } from './general/general.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Primeng components
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { GameService } from './service/game.service';
import { CpuService } from './service/cpu.service';


@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    BoardComponent,
    SquareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    DropdownModule,
    ButtonModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [GameService, CpuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
