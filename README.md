# angular2-signaturepad

Angular 2 component for [szimek/signature_pad](https://www.npmjs.com/package/signature_pad).
Fork of [wulfsolter/angular2-signaturepad](https://www.npmjs.com/package/angular2-signaturepad).

# V1.1.0
  ## Features:
  - [x] Added Signature pad control
# Install 

`npm install angular2-signaturepad --save`

## Reference Implementation

- [Live Demo](http://lathonez.com/angular2-signaturepad-demo/)
- [Source](https://github.com/lathonez/angular2-signaturepad-demo)

## Usage example

API is identical to [szimek/signature_pad](https://www.npmjs.com/package/signature_pad).

Options are as per [szimek/signature_pad](https://www.npmjs.com/package/signature_pad) with the following additions:

- canvasWidth: width of the canvas (px)
- canvasHeight: height of the canvas (px)
  The above options are provided to avoid accessing the DOM directly from your component to adjust the canvas size.

```typescript

// import into app module

import { SignaturePadModule } from 'angular2-signaturepad';

...

@NgModule({
  declarations: [ ],
  imports: [ SignaturePadModule, ReactiveFormsModule ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})

// then import for use in a component

import { Component, ViewChild } from 'angular2/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  template: '<signature-pad [options]="signaturePadOptions" (drawStart)="drawStart()" [canvasStylesObject]="styles" (drawEnd)="drawEnd()"></signature-pad>'
})

export class SignaturePadPage{

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  /**
   * Styles that will directly be applied to the canvas element.
  */
  styles: Partial<CSSStyleDeclaration> = {
    border: '1px dashed rgb(192, 192, 192)',
    cursor: 'crosshair',
  };

  signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };

  constructor() {
    // no-op
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawEnd() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
}
```

## Usage with reactive forms

``` typescript

@NgModule({
  declarations: [ ],
  imports: [ SignaturePadModule ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})

// then import for use in a component

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  SignaturePadOptions,
  SignaturePadControl,
} from 'angular2-signaturepad';

export class AppComponent implements AfterViewInit {
  @ViewChild(SignaturePadControl)
  signaturePad!: SignaturePadControl;

  signaturePadOptions: Partial<SignaturePadOptions> = {
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 300,
  };

  form = this.fb.group({
    signature: [],
  });

  styles: Partial<CSSStyleDeclaration> = {
    border: '1px dashed rgb(192, 192, 192)',
    cursor: 'crosshair',
  };

  constructor(private fb: FormBuilder) {}

  ngAfterViewInit(): void {
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.clear();
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
}

```

``` html
<form [formGroup]="form">
  <signature-pad-control
    formControlName="signature"
    [canvasStylesObject]="styles"
    [exportType]="'dataURL'"
    [options]="signaturePadOptions"
    (drawStart)="drawStart()"
    (drawEnd)="drawComplete()"
  ></signature-pad-control>
  <div>
    <button type="button" class="mr-2" (click)="clear()">Clear</button>
    <button type="submit" (click)="submit()">Submit</button>
  </div>
</form>
```

* exportType can be 'dataURL' or 'data'
  * Where dataUrl will populate the signature field with a dataURL
  * Where data will populate the signature field with a PointGroup array

