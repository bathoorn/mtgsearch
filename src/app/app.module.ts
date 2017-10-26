import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {MatCardModule, MatToolbarModule,MatIconModule} from '@angular/material';

import { AppComponent } from './app.component';
import { SearchApiService } from './search-api.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
	  MatCardModule, 
	  MatToolbarModule,
	  MatIconModule
  ],
  providers: [SearchApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
