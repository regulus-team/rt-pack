import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {CSSFont} from './symbols';

@Injectable()
export class RtDefineStrokeWidthService {
  /** Canvas context used to measure text width. */
  protected canvasContext: CanvasRenderingContext2D;

  constructor(@Inject(DOCUMENT) private document: Document) {
    const canvas = document.createElement('canvas');
    this.canvasContext = canvas.getContext('2d');
  }

  /**
   * Returns stroke width for the provided text with specified CSS rule.
   */
  public getTextWidth(stroke: string, font: CSSFont): number {
    this.canvasContext.font = font;
    const metrics = this.canvasContext.measureText(stroke);
    return metrics.width;
  }
}
