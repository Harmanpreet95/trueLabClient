import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PatienteditPage } from './patientedit';

@NgModule({
  declarations: [
    PatienteditPage,
  ],
  imports: [
    IonicModule.forRoot(PatienteditPage),
  ],
  exports: [
    PatienteditPage
  ]
})
export class PatienteditPageModule {}
