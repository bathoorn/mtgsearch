import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule, MatToolbarModule,MatIconModule} from '@angular/material';

import { AppComponent } from './app.component';
import { SearchResultsDirective } from './search-results.directive';
import { SearchApiService } from './search-api.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsDirective
  ],
  imports: [
    BrowserModule,
	  MatCardModule, 
	  MatToolbarModule,
	  MatIconModule
  ],
  providers: [SearchApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
