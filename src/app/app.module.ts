import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';

import { BankDetailsService } from './service/bank-details.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { StorageServiceModule } from 'ngx-webstorage-service';
@NgModule({
  imports:      [ BrowserModule, 
				  FormsModule, 
				  Ng2SearchPipeModule, 
				  HttpModule, 
				  NgxPaginationModule, 
				  StorageServiceModule ],
				  
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ BankDetailsService ],
})
export class AppModule { }
