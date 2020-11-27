import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes} from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NewsDatabase } from './database.service'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { CountryListComponent } from './components/country-list.component';
import { ApiKeySetComponent } from './components/api-key-set.component';
import { NewsPageComponent } from './components/news-page.component';
import { CheckApiKeyComponent } from './components/check-api-key.component'

const routes: Routes = [
  {path: '', component: CheckApiKeyComponent},
  {path: 'countrylist', component: CountryListComponent},
  {path: 'setapikey', component: ApiKeySetComponent},
  {path: 'news/:country', component: NewsPageComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    ApiKeySetComponent,
    NewsPageComponent,
    CheckApiKeyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    NewsDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
