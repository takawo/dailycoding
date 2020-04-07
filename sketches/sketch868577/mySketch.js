//reference @38miyoji's Tweet 
//https://twitter.com/38miyoji/status/1246088934293008385

let colorPickerA;
let colorPickerB;
// let colorPickerC;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  colorPickerA = createColorPicker(color(180, 100, 100));
  colorPickerA.position(20, 20);

  colorPickerB = createColorPicker(color(300, 100, 100));
  colorPickerB.position(20 + colorPickerA.width, 20);

}

function draw() {
  background(0, 0, 95);

  let colorA = colorPickerA.color();
  let colorB = colorPickerB.color();

  let offset = width / 8;

  let gradient = drawingContext.createLinearGradient(offset, offset, width - offset, offset);

  colorMode(RGB, 255, 255, 255, 255);
  let colorC = lerpColor(colorA, colorB, 0.5);
  colorMode(HSB, 360, 100, 100, 100);
  let colorD = colorC;
  let colorE = color(hue(colorC),
    constrain(saturation(colorC) + 20, 0, 100),
    constrain(brightness(colorC) + 20, 0, 100));
  gradient.addColorStop(0.0, colorA);

  gradient.addColorStop(0.5, colorD);
  gradient.addColorStop(1.0, colorB);

  drawingContext.fillStyle = gradient;

  noStroke();
  rect(offset, offset, width - offset * 2, (height - offset * 2) / 2);
  fill(0,0,100);
  

  let gradient2 = drawingContext.createLinearGradient(offset, offset, width - offset, offset);
  gradient2.addColorStop(0.0, colorA);

  gradient2.addColorStop(0.5, colorE);
  gradient2.addColorStop(1.0, colorB);

  drawingContext.fillStyle = gradient2;

  noStroke();

  rect(offset, offset + (height - offset * 2) / 2, width - offset * 2, (height - offset * 2) / 2);
}