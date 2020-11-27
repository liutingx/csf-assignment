import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NewsDatabase } from '../database.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  countries =
  'ae;ar;at;au;be;bg;br;ca;ch;cn;co;cu;cz;de;eg;fr;gb;gr;hk;hu;id;ie;il;in;it;jp;kr;lt;lv;ma;mx;my;ng;nl;no;nz;ph;pl;pt;ro;rs;ru;sa;se;sg;si;sk;th;tr;tw;ua;us;ve;za';
  data;

  constructor(private http: HttpClient, private newsdatabase: NewsDatabase) { }

  ngOnInit(): void {
    
    this.newsdatabase.getCountryList()
    .then(result => {
      if(result.length == 0){
        this.checkForCountries();
      }
      else{
        this.data = result[0];
      }
    }) 
  
  }

checkForCountries(){ 
  const url = 'https://restcountries.eu/rest/v2/alpha'
    const params = (new HttpParams()).set('codes', this.countries)
    this.http.get<any>(url, {params: params})
    .toPromise()
    .then(results => {
      this.data = results.map(d => {
        return {name:d.name, flag:d.flag, code: d.alpha2Code.toLowerCase()}
      })
      this.newsdatabase.saveCountryList(this.data)
    })
  }


}