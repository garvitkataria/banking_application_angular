import { Component } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { BankDetailsService } from './service/bank-details.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

@Injectable()
export class AppComponent  {
      title = 'Banks Search Application';
      searchText;

      location="BANGALORE";
      banks_length=0;
      loader_flag = 0;

      banks : Banks[]=[];
      favourite_banks:Banks[]=[]
      show_banks:Banks[]=[]

      page_size=50;
      table_flag=0;
    constructor( private dataService:BankDetailsService, )
    {
        

        if(localStorage.getItem("FAVOURITE"))
            this.favourite_banks = JSON.parse(localStorage.getItem("FAVOURITE"));

        if(localStorage.getItem(this.location))
        {
            this.banks = JSON.parse(localStorage.getItem(this.location));
            this.banks_length = this.banks.length;
            this.loader_flag = 1;
            this.show_banks = this.banks;
        }
        else
        {
            this.dataService.getBank(this.location).subscribe((res)=>{
                console.log(res);
                this.banks = res.json();
                console.log(this.banks[0]);

                this.banks_length = this.banks.length;
                this.loader_flag = 1;
                localStorage.setItem(this.location, JSON.stringify(this.banks));
                this.show_banks = this.banks;
            });
        }
        
    }

    changeLocation()
    {
        this.loader_flag = 0;
        console.log(this.location)
        if(localStorage.getItem(this.location))
        {
            this.banks = JSON.parse(localStorage.getItem(this.location));
            this.banks_length = this.banks.length;
            this.loader_flag = 1;
            this.show_banks = this.banks;
        }
        else
        {
            this.dataService.getBank(this.location).subscribe((res)=>{
                console.log(res);
                this.banks = res.json();
                console.log(this.banks[0]);

                this.banks_length = this.banks.length;
                this.loader_flag = 1;
                localStorage.setItem(this.location, JSON.stringify(this.banks));
                this.show_banks = this.banks;
            });  
        }  
    }

    addFavouriteBank(bank)
    {
        console.log(bank)
        let check = 1;
        for (var i = this.favourite_banks.length - 1; i >= 0; i--){
            if(this.favourite_banks[i].ifsc == bank.ifsc)
            {
                check=0;
                break;
            }
        }
        
        if(check)
        {
            this.favourite_banks.push(bank);
            localStorage.setItem("FAVOURITE", JSON.stringify(this.favourite_banks));
        }
        this.changeTable()
    }
    changePageSize(size)
    {
        this.page_size = size;
    }
    changeTable()
    {
        this.table_flag = (this.table_flag)?0:1;
        this.show_banks = (this.table_flag)?this.favourite_banks:this.banks;
    }
}
interface Banks
  {
    "ifsc": string,
    "bank_id": string,
    "branch": string,
    "address": string,
    "city": string,
    "district": string,
    "state": string,
    "bank_name": string
  }
