import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import { App } from './app';
import { Dashboard } from './components/dashboard/dashboard';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Dashboard
  ],
  providers: [],
  bootstrap: []
})

export class AppModule { }
