import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    ErrorMessageComponent
  ]
})
export class SharedModule { }
