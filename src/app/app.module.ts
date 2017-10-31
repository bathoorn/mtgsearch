import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule, MatToolbarModule,MatIconModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatSidenavModule,MatCheckboxModule} from '@angular/material';

import { AppComponent } from './app.component';
import { SearchApiService } from './search-api.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
	  MatCardModule, 
	  MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule,
    BrowserAnimationsModule
  ],
  providers: [SearchApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
