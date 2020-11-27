import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsDatabase } from '../database.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

  countrycode = ''
  API_KEY = ''
  news;
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient,
    private newsdatabase: NewsDatabase) { }

  ngOnInit(): void {

    this.newsdatabase.getApiKey()
    .then(result => {
      console.log('result', result[0].apiKey)
      this.API_KEY = result.map(s => {
        console.log('s', s)
        return s.apiKey
      })
      if(this.API_KEY)
      {
        this.getNewsData();
      }
    })
    
    //console.log('code', this.countrycode)
    //console.log('api', this.apiservice.getApikey())
  }

  getNewsData(){
    const url = 'https://newsapi.org/v2/top-headlines'

    this.countrycode = this.activatedRoute.snapshot.params['country']

    const params = (new HttpParams).set('country', this.countrycode).set('apiKey', this.API_KEY)

    this.http.get<any>(url, {params: params})
    .toPromise()
    .then(results => {
      console.log('results', results)
      this.news = results.articles.map(d => {
        return {title:d.title, img_url:d.urlToImage, description: d.description, 
        content: d.content, url: d.url}
      })
      console.log('data', this.news)
      //this.newsdatabase.saveCountryList(this.)
    })
  }

}
