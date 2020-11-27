import { Injectable } from '@angular/core'
import Dexie from 'dexie'
import { CountryDB } from './models'

@Injectable()
export class NewsDatabase extends Dexie {
    private countryDB: Dexie.Table<CountryDB, string>
    private setApiKey: Dexie.Table<string, string>

    constructor(){
        //name of db
        super('newsappdb')

        //create schema
        this.version(1).stores({
            setApiKey: 'apiKey',
            countrydb: '++id'
        })
        this.setApiKey = this.table('setApiKey')
        this.countryDB = this.table('countrydb')
    }
    saveApiKey(s: string): Promise<any>{
        return this.setApiKey.add(s);
    }

    getApiKey(): Promise<any>{
        return this.setApiKey.toArray()
    }

    async deleteApiKey(s: string): Promise<any>{
       return await this.setApiKey.where('apiKey').anyOf(s).delete();
    }

    saveCountryList(d: CountryDB): Promise<any>{
        return this.countryDB.add(d);
    }
}