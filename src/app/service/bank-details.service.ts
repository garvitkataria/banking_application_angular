import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BankDetailsService {

	server="/banks?city=";
	constructor(public http:Http) { }
	getBank(location)
	{
		console.log("Testing", this.server+location)
		return this.http.get(
			this.server+location
        );
	}
}
