import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NewsDatabase } from '../database.service';

@Component({
  selector: 'app-check-api-key',
  templateUrl: './check-api-key.component.html',
  styleUrls: ['./check-api-key.component.css']
})
export class CheckApiKeyComponent implements OnInit {

  API_KEY = '';
  constructor(private router: Router, private newsdatabase: NewsDatabase) { }

  ngOnInit(): void {

    this.newsdatabase.getApiKey()
    .then(result => {
      this.API_KEY = result.map(s => {
        return s.apiKey
      })
      if(this.API_KEY.length){
        this.router.navigate(['/countrylist'])
      }
      else{
        this.router.navigate(['/setapikey'])
      }
    })
  }

}
