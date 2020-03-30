let ns = 800;
let rs;
let pallete = ["#0A12A0","#1A32CB","D03136#","#610D2D","#FBAFB2","#AF59AB","#010228"];
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  rs = int(random(1000));
  
  graphics = createGraphics(width,height);
  graphics.colorMode(HSB,360,100,100,100);
  graphics.fill(0,0,100,10);
  graphics.noStroke();
  for(let i = 0; i < graphics.width *graphics.height * 10/100; i++){
    graphics.ellipse(
      random(graphics.width),
      random(graphics.height),
      random(3),
      random(3)
    );
  }
}

function draw() {
  background(random(pallete));
  randomSeed(rs);
  let w = sqrt(sq(width) + sq(height));
  let offset = width / 8;
  let margin = offset / 10;

  let cells = int(random(2, 8));
  let d = (w + offset * 2 - margin * (cells - 1)) / cells;

  push();
  translate(width / 2, height / 2);
  rotate(45 + int(random(4)) * 360 / 4);
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = -w / 2 - offset + i * (d + margin);
      let y = -w / 2 - offset + j * (d + margin);
      let g = createGraphics(d, d);
      for (let n = 0; n < 1; n++) {
        separateGrid(0, 0, d, g);
      }
      let g2 = createGraphics(d, d);
      //g2.rectMode(CENTER);
      g2.ellipse(d / 2, d / 2, d, d);
      let img = pgMask(g, g2);
      imageMode(CENTER);
      push();
      translate(x+d/2,y+d/2);
      //rotate(int(random(8)) * 360/8);
      fill(0,0,10);
      noStroke();
      //rectMode(CENTER)
      ellipse(0,0,d, d);
      image(img, 0,0,img.width,img.height);
      pop();
    }
  }
  pop();
  image(graphics,0,0);
  noLoop();
}

function pgMask(_content, _mask) {
  //Create the mask as image
  var img = createImage(int(_mask.width), int(_mask.height));
  img.copy(_mask, 0, 0, int(_mask.width), int(_mask.height), 0, 0, int(_mask.width), int(_mask.height));
  //load pixels
  img.loadPixels();
  for (var i = 0; i < img.pixels.length; i += 4) {
    // 0 red, 1 green, 2 blue, 3 alpha
    // Assuming that the mask image is in grayscale,
    // the red channel is used for the alpha mask.
    // the color is set to black (rgb => 0) and the
    // alpha is set according to the pixel brightness.
    var v = img.pixels[i];
    img.pixels[i] = 0;
    img.pixels[i + 1] = 0;
    img.pixels[i + 2] = 0;
    img.pixels[i + 3] = v;
  }
  img.updatePixels();
  //convert _content from pg to image
  var contentImg = createImage(int(_content.width), int(_content.height));
  contentImg.copy(_content, 0, 0, int(_content.width), int(_content.height), 0, 0, int(_content.width), int(_content.height));
  // create the mask
  contentImg.mask(img)
  // return the masked image
  return contentImg;
}

function separateGrid(x, y, _d, g) {
  let sepNum = int(random(2, 4));
  let w = _d / sepNum;
  for (let i = x; i < x + _d; i += w) {
    for (let j = y; j < y + _d; j += w) {
      let n = noise(i / ns, j / ns, frameCount / ns);
      if (n < 0.55 && _d > width / 10) {
        separateGrid(i, j, w, g);
      } else {
        //if (random(100) > 50) 
        g.noStroke();
        g.fill(random(pallete));
        g.ellipse(i+w/2, j+w/2, w, w);
      }
    }
  }
}