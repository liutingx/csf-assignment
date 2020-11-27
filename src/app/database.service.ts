import { Injectable } from '@angular/core'
import Dexie from 'dexie'
import { CountryDB, NewsDB } from './models'

@Injectable()
export class NewsDatabase extends Dexie {
    private countryDB: Dexie.Table<CountryDB, string>
    private setApiKey: Dexie.Table<string, string>
    private newsDB: Dexie.Table<NewsDB, string>

    constructor(){
        //name of db
        super('newsappdb')

        //create schema
        this.version(1).stores({
            setApiKey: 'apiKey',
            countrydb: '++id',
            newsdb: 'title'
        })
        this.setApiKey = this.table('setApiKey')
        this.countryDB = this.table('countrydb')
        this.newsDB = this.table('newsdb')
    }
    saveApiKey(s: string): Promise<any>{
        return this.setApiKey.add(s);
    }

    getApiKey(): Promise<any>{
        return this.setApiKey.toArray();
    }

    async deleteApiKey(s: string): Promise<any>{
       return await this.setApiKey.where('apiKey').anyOf(s).delete();
    }

    saveCountryList(d: CountryDB): Promise<any>{
        return this.countryDB.add(d);
    }

    getCountryList(): Promise<any>{
        return this.countryDB.toArray();
    }

    cacheNews(d: NewsDB): Promise<any>{
        return this.newsDB.add(d);
    }

    getNews(): Promise<any>{
        return this.newsDB.toArray();
    }
}