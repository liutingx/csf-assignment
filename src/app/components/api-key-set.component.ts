import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsDatabase } from '../database.service';

@Component({
  selector: 'app-api-key-set',
  templateUrl: './api-key-set.component.html',
  styleUrls: ['./api-key-set.component.css']
})
export class ApiKeySetComponent implements OnInit {

  form: FormGroup
  API_KEY = ''

  constructor(private fb: FormBuilder, private newsdatabase: NewsDatabase,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.setKey();
  }

  private setKey(): FormGroup{
    return this.fb.group({
      apiKey: this.fb.control('', [Validators.required])
    });
  }

  async deleteApi(){
    await this.newsdatabase.deleteApiKey(this.form.get('apiKey').value)
    this.form.reset();
  }

  async addApi(){
    this.newsdatabase.saveApiKey(this.form.value)
    this.router.navigate(['/'])
  }

}
