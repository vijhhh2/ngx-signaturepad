import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  SignaturePad,
  SignaturePadOptions,
  SignaturePadControl,
} from 'angular2-signaturepad';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(SignaturePadControl)
  signaturePad!: SignaturePadControl;
  signaturePadOptions: Partial<SignaturePadOptions> = {
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 300,
  };

  data = {
    dotSize: 0,
    minWidth: 1,
    maxWidth: 2.5,
    penColor: 'black',
    points: [
      {
        time: 1648198373642,
        x: 99.83203125,
        y: 71.9609375,
        pressure: 0.5,
      },
      {
        time: 1648198373743,
        x: 104.85546875,
        y: 79.828125,
        pressure: 0.5,
      },
      {
        time: 1648198373776,
        x: 129.3671875,
        y: 100.91796875,
        pressure: 0.5,
      },
      {
        time: 1648198373793,
        x: 149.5234375,
        y: 115.14453125,
        pressure: 0.5,
      },
      {
        time: 1648198373809,
        x: 176.765625,
        y: 127.52734375,
        pressure: 0.5,
      },
      {
        time: 1648198373827,
        x: 203.484375,
        y: 137.23828125,
        pressure: 0.5,
      },
      {
        time: 1648198373844,
        x: 227.1953125,
        y: 141.9765625,
        pressure: 0.5,
      },
      {
        time: 1648198373861,
        x: 241.8984375,
        y: 141.9765625,
        pressure: 0.5,
      },
      {
        time: 1648198373878,
        x: 250.58984375,
        y: 139.57421875,
        pressure: 0.5,
      },
      {
        time: 1648198373895,
        x: 257.5703125,
        y: 132.1328125,
        pressure: 0.5,
      },
      {
        time: 1648198373912,
        x: 260.73046875,
        y: 124.93359375,
        pressure: 0.5,
      },
      {
        time: 1648198373930,
        x: 261.59765625,
        y: 117.734375,
        pressure: 0.5,
      },
      {
        time: 1648198373948,
        x: 262.46484375,
        y: 110.53515625,
        pressure: 0.5,
      },
      {
        time: 1648198373964,
        x: 262.46484375,
        y: 103.3359375,
        pressure: 0.5,
      },
      {
        time: 1648198373981,
        x: 261.75,
        y: 94.79296875,
        pressure: 0.5,
      },
      {
        time: 1648198374064,
        x: 256.44921875,
        y: 93.25,
        pressure: 0.5,
      },
      {
        time: 1648198374081,
        x: 249.48828125,
        y: 98.46875,
        pressure: 0.5,
      },
      {
        time: 1648198374097,
        x: 239.73046875,
        y: 106.265625,
        pressure: 0.5,
      },
      {
        time: 1648198374114,
        x: 227.12109375,
        y: 116.765625,
        pressure: 0.5,
      },
      {
        time: 1648198374132,
        x: 214.51171875,
        y: 126.21484375,
        pressure: 0.5,
      },
      {
        time: 1648198374149,
        x: 200.45703125,
        y: 134.83984375,
        pressure: 0.5,
      },
      {
        time: 1648198374165,
        x: 177.20703125,
        y: 149.22265625,
        pressure: 0.5,
      },
      {
        time: 1648198374181,
        x: 161.70703125,
        y: 158.07421875,
        pressure: 0.5,
      },
      {
        time: 1648198374197,
        x: 145.49609375,
        y: 164.54296875,
        pressure: 0.5,
      },
      {
        time: 1648198374214,
        x: 138.140625,
        y: 167.69140625,
        pressure: 0.5,
      },
      {
        time: 1648198374230,
        x: 120.58203125,
        y: 174.52734375,
        pressure: 0.5,
      },
      {
        time: 1648198374247,
        x: 114.8828125,
        y: 175.83984375,
        pressure: 0.5,
      },
    ],
  };
  data2 =
    'data:image/png;base64,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AQIECBAQ6MYAAQIECBBoICDQG3SiEggQIECAgEA3BggQIECAQAMBgd6gE5VAgAABAgQEujFAgAABAgQaCAj0Bp2oBAIECBAgINCNAQIECBAg0EBAoDfoRCUQIECAAAGBbgwQIECAAIEGAgK9QScqgQABAgQICHRjgAABAgQINBAQ6A06UQkECBAgQECgGwMECBAgQKCBgEBv0IlKIECAAAECAt0YIECAAAECDQQEeoNOVAIBAgQIEBDoxgABAgQIEGggINAbdKISCBAgQICAQDcGCBAgQIBAAwGB3qATlUCAAAECBAS6MUCAAAECBBoICPQGnagEAgQIECAg0I0BAgQIECDQQECgN+hEJRAgQIAAAYFuDBAgQIAAgQYCAr1BJyqBAAECBAgIdGOAAAECBAg0EBDoDTpRCQQIECBAQKAbAwQIECBAoIGAQG/QiUogQIAAAQIC3RggQIAAAQINBAR6g05UAgECBAgQEOjGAAECBAgQaCAg0Bt0ohIIECBAgIBANwYIECBAgEADAYHeoBOVQIAAAQIEBLoxQIAAAQIEGggI9AadqAQCBAgQICDQjQECBAgQINBAQKA36EQlECBAgAABgW4MECBAgACBBgICvUEnKoEAAQIECAh0Y4AAAQIECDQQEOgNOlEJBAgQIEBAoBsDBAgQIECggYBAb9CJSiBAgAABAgLdGCBAgAABAg0EBHqDTlQCAQIECBAQ6MYAAQIECBBoICDQG3SiEggQIECAgEA3BggQIECAQAMBgd6gE5VAgAABAgQEujFAgAABAgQaCAj0Bp2oBAIECBAgINCNAQIECBAg0EBAoDfoRCUQIECAAAGBbgwQIECAAIEGAgK9QScqgQABAgQI/D9JhWRa2FKA0gAAAABJRU5ErkJggg==';

  form = this.fb.group({
    signature: [{ value: this.data2, disabled: true }],
  });

  styles: Partial<CSSStyleDeclaration> = {
    border: '1px dashed rgb(192, 192, 192)',
    cursor: 'crosshair',
  };

  constructor(private fb: FormBuilder) {}

  ngAfterViewInit(): void {
    this.signaturePad.set('minWidth', 1);
  }

  clear(): void {
    this.signaturePad.clear();
  }

  drawStart(): void {
    console.log('drawStart');
  }
  drawComplete(): void {
    console.log('drawComplete');
  }

  submit(): void {
    console.log(this.form.value);
  }

  enable(): void {
    const c = this.form.get('signature');
    c?.enable();
  }
  disable(): void {
    const c = this.form.get('signature');
    c?.disable();
  }
}
