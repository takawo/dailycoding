let w = 600;
let h = 600;
let canvas;
let palette;
let c;
let img;
let src;

function preload() {
  src = loadImage("https://loremflickr.com/" + w + "/" + h + "/");
}

function setup() {
  canvas = createCanvas(w, h);
  image(src, 0, 0);
  var colorThief = new ColorThief();
  var sourceImage = canvas.canvas.toDataURL();
  img = createImg(sourceImage, function() {
    img.id("image");
    let img2 = document.getElementById("image");
    c = colorThief.getColor(img2);
    palette = colorThief.getPalette(img2);
    for (let i = 0; i < palette.length; i++) {
      let w = int(width / palette.length);
      let h = int(height / 6);
      let x = map(i, 0, palette.length - 1, 0, width - w);
      let y = height - h - 10;
      stroke(palette[i]);
      fill(palette[i]);
      rect(x, y, w, h);
    }
  });
  img.remove();
}