import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SignaturePad } from './angular2-signaturepad.component';
import { SignaturePadControl } from './angular2-signauturepad-control/angular2-signauturepad-control.component';

@NgModule({
  declarations: [SignaturePad, SignaturePadControl],
  imports: [CommonModule],
  exports: [SignaturePad, SignaturePadControl],
})
export class SignaturePadModule {}
