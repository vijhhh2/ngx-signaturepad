import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SignaturePad } from './angular2-signaturepad.component';
import { SignauturepadControlComponent } from './angular2-signauturepad-control/angular2-signauturepad-control.component';

@NgModule({
  declarations: [SignaturePad, SignauturepadControlComponent],
  imports: [CommonModule],
  exports: [SignaturePad, SignauturepadControlComponent],
})
export class SignaturePadModule {}
