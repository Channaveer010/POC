import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatTableModule } from '@angular/material/table';
import {  MatPaginatorModule } from '@angular/material/paginator';
import {  MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select'
import {MatDividerModule} from '@angular/material/divider'
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { StylePaginatorDirective } from './style-paginator.directive';
import {MatSortModule} from '@angular/material/sort';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    StylePaginatorDirective 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule   ,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDividerModule,
    MatCheckboxModule,
    CustomMaterialModule,
    ReactiveFormsModule ,
    MatSortModule ,
    MatChipsModule,
    MatListModule,
    MatAutocompleteModule,
    MatIconModule
    

  ],
  providers: [],
  bootstrap: [AppComponent],
  exports : [StylePaginatorDirective]
})
export class AppModule { }
