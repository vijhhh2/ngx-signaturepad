// tslint:disable: max-line-length
export interface SignaturePadOptions {
  dotSize: number; // Radius of a single dot.
  minWidth: number; // Minimum width of a line. Defaults to 0.5.
  maxWidth: number; // Maximum width of a line. Defaults to 2.5.
  throttle: number; // Draw the next point at most once per every x milliseconds. Set it to 0 to turn off throttling. Defaults to 16.
  minDistance: number; // Minimum distance in pixels between two points. Defaults to 5.
  backgroundColor: string; // Color used to clear the background. Can be any color format accepted by context.fillStyle. Defaults to "rgba(0,0,0,0)" (transparent black). Use a non-transparent color e.g. "rgb(255,255,255)" (opaque white) if you'd like to save signatures as JPEG images.
  penColor: string; // Color used to draw the lines. Can be any color format accepted by context.fillStyle. Defaults to "rgb(0,0,0)" (black).
  velocityFilterWeight: number; // Weight used to modify new velocity based on the previous velocity. Defaults to 0.7.
  canvasHeight: number; // Height of the canvas. Defaults to 200.
  canvasWidth: number; // Width of the canvas. Defaults to 300.
}
