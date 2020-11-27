import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsDatabase } from '../database.service';
import { NewsDB } from '../models';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

  countrycode = ''
  API_KEY = ''
  news;
  country = ''

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient,
    private newsdatabase: NewsDatabase) { }

  ngOnInit(): void {

    this.newsdatabase.getApiKey()
    .then(result => {
      this.API_KEY = result.map(s => {
        console.log('s', s)
        return s.apiKey
      })
      if(this.API_KEY)
      {
        this.getNewsData()

      }
    })
    
  }
  // checkNewsCache(){
  //   this.newsdatabase.getNews()
  //   .then(result => {
  //     if(result.length == 0)
  //       this.getNewsData();
  //     else
  //       this.news = result[0];
  //   })
  // }

  getNewsData(){
    const url = 'https://newsapi.org/v2/top-headlines'

    this.countrycode = this.activatedRoute.snapshot.params['country']

    const params = (new HttpParams)
      .set('country', this.countrycode)
      .set('pageSize', '30')
    const headers = (new HttpHeaders()).set("x-api-key", this.API_KEY)

    this.http.get<any>(url, {params: params, headers: headers})
    .toPromise()
    .then(results => {
      console.log('results', results)
      this.getCountry();
      this.news = results.articles.map(d => {
        return {countrycode: this.countrycode, source: d.source.name,  author: d.author, title:d.title, 
          description: d.description, url: d.url, img_url:d.urlToImage, 
          publish: d.publishedAt, content: d.content}
      })
    })
  }

  getCountry(){
    this.newsdatabase.getCountryList()
    .then(result => {
      result[0].find(i => {
        if(i.code == this.countrycode)
        this.country = i.name;
      })
    })
  }

}
