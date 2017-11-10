import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule} from '@angular/cdk/table';
import { MatCardModule, MatToolbarModule,MatIconModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,MatNativeDateModule} from '@angular/material';
import { MatButtonModule,MatSidenavModule,MatCheckboxModule,MatMenuModule,MatTableModule,MatSortModule,MatPaginatorModule  } from '@angular/material'; 
import { MatAutocompleteModule, MatDialogModule, MatTabsModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { FacetComponent } from './facet/facet.component';
import { SearchApiService } from './search-api.service';
import { ChartsModule } from 'ng2-charts';
import { CardDetailComponent } from './card-detail/card-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    FacetComponent,
    CardDetailComponent
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
    MatMenuModule,
    MatPaginatorModule,
    CdkTableModule,
    MatTableModule,
    MatSortModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTabsModule,
    FlexLayoutModule,
    ChartsModule,
    BrowserAnimationsModule
  ],
  providers: [SearchApiService],
  bootstrap: [AppComponent],
  entryComponents: [
    CardDetailComponent,
  ]
})
export class AppModule { }
