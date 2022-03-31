import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';

import * as SignaturePadNative from 'signature_pad';
import { FromDataOptions, PointGroup } from 'signature_pad';
import { FromDataUrlOptions } from './interfaces/from-data-url-options';
import { SignaturePadOptions } from './interfaces/signature-pad-options';
@Component({
  template: '<canvas [ngClass]="canvasStylesObject" ></canvas>',
  // tslint:disable-next-line: component-selector
  selector: 'signature-pad',
})
export class SignaturePad implements AfterViewInit, OnDestroy {
  @Input() public options: Partial<SignaturePadOptions> = {};
  @Input() public canvasStylesObject: Partial<CSSStyleDeclaration> = {
    border: 'none',
  };
  @Output() public drawStart = new EventEmitter<boolean>();
  @Output() public drawEnd = new EventEmitter<boolean>();

  protected signaturePad!: SignaturePadNative.default;

  constructor(private elementRef: ElementRef) {}

  public ngAfterViewInit(): void {
    const canvas: HTMLCanvasElement =
      this.elementRef.nativeElement.querySelector('canvas');

    if (this.options.canvasHeight) {
      canvas.height = this.options.canvasHeight;
    }

    if (this.options.canvasWidth) {
      canvas.width = this.options.canvasWidth;
    }

    this.signaturePad = new SignaturePadNative.default(canvas, this.options);
    this.signaturePad.addEventListener('beginStroke', this.onBegin.bind(this));
    this.signaturePad.addEventListener('endStroke', this.onEnd.bind(this));
  }

  public ngOnDestroy(): void {
    const canvas: HTMLCanvasElement =
      this.elementRef.nativeElement.querySelector('canvas');
    canvas.width = 0;
    canvas.height = 0;
    this.off();
  }

  public resizeCanvas(canvas: HTMLCanvasElement): void {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    if (!canvas) {
      return;
    }
    const ratio: number = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d')?.scale(ratio, ratio);
    this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
  }

  // Returns signature image as an array of point groups
  public toData(): Array<PointGroup> {
    if (this.signaturePad) {
      return this.signaturePad.toData();
    } else {
      return [];
    }
  }

  // Draws signature image from an array of point groups
  public fromData(points: Array<PointGroup>, options?: FromDataOptions): void {
    this.signaturePad.fromData(points, options);
  }

  // Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible paramters)
  public toDataURL(imageType?: string, quality?: number): string {
    return this.signaturePad.toDataURL(imageType, quality); // save image as data URL
  }

  // Draws signature image from data URL
  public fromDataURL(dataURL: string, options: FromDataUrlOptions = {}): void {
    // set default height and width on read data from URL
    if (!options.hasOwnProperty('height') && this.options.canvasHeight) {
      options.height = this.options.canvasHeight;
    }
    if (!options.hasOwnProperty('width') && this.options.canvasWidth) {
      options.width = this.options.canvasWidth;
    }
    this.signaturePad.fromDataURL(dataURL, options);
  }

  // Clears the canvas
  public clear(): void {
    this.signaturePad.clear();
  }

  // Returns true if canvas is empty, otherwise returns false
  public isEmpty(): boolean {
    return this.signaturePad.isEmpty();
  }

  // Unbinds all event handlers
  public off(): void {
    this.signaturePad.off();
  }

  // Rebinds all event handlers
  public on(): void {
    this.signaturePad.on();
  }

  // set an option on the signaturePad - e.g. set('minWidth', 50);
  public set(option: string, value: any): void {
    const canvas: HTMLCanvasElement =
      this.elementRef.nativeElement.querySelector('canvas');
    switch (option) {
      case 'canvasHeight':
        canvas.height = value;
        break;
      case 'canvasWidth':
        canvas.width = value;
        break;
      default:
        (this.signaturePad as any)[option] = value;
    }
  }

  // notify subscribers on signature begin
  public onBegin(): void {
    this.drawStart.emit(true);
  }

  // notify subscribers on signature end
  public onEnd(): void {
    this.drawEnd.emit(true);
  }

  public queryPad(): any {
    return this.signaturePad;
  }
}
