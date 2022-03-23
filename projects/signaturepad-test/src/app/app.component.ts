import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SignaturePad, SignaturePadOptions } from 'angular2-signaturepad';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(SignaturePad) signaturePad!: SignaturePad;
  signaturePadOptions: Partial<SignaturePadOptions> = {
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 300,
  };

  ngAfterViewInit(): void {
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.clear();
  }

  drawStart(): void {
    console.log('drawStart');
  }
  drawComplete(): void {
    console.log('drawComplete');
    console.log(this.signaturePad.toDataURL());
  }
}
