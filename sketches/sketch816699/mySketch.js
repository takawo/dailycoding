let shapeGraphics;
let patternGraphics;
let textureGraphics;
let counter = 0;
let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  shapeGraphics = createGraphics(width, height);
  shapeGraphics.angleMode(DEGREES);
  patternGraphics = createGraphics(width, height);

  textureGraphics = createGraphics(width, height);
  textureGraphics.colorMode(HSB, 360, 100, 100, 100);
  textureGraphics.noStroke();
  textureGraphics.fill(0, 0, 100, 8);

  for (let i = 0; i < textureGraphics.width * textureGraphics.height * 15 / 100; i++) {
    textureGraphics.ellipse(
      random(textureGraphics.width),
      random(textureGraphics.height),
      random(3),
      random(3)
    );
  }
}

function draw() {
  background(0, 0, 5);
  let offset = width / 10;
  
  separateGrid(-offset, -offset, width + offset * 2);
  let img = pgMask(patternGraphics, shapeGraphics);
  image(img, 0, 0);
  //image(shapeGraphics, 0, 0);
  frameRate(1);
  image(textureGraphics, 0, 0);
  noLoop();
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 6));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 10) {
        separateGrid(i, j, w);
      } else {
        let n = int(random(2, 19));
        while (n == int(w)) {
          n = int(random(2, 19));
        }
        drawPattern(i, j, w, w, n, patternGraphics);
        shapeGraphics.push();
        shapeGraphics.translate(i+w/2,j+w/2 + w * 0.1);
        shapeGraphics.textSize(w);
        shapeGraphics.textAlign(CENTER,CENTER);
        shapeGraphics.fill(255);
        shapeGraphics.text(letters[counter],0,0);
        shapeGraphics.pop();

        push();
        translate(i+w/2,j+w/2 + w * 0.1);
        textSize(w);
        textAlign(CENTER,CENTER);
        //fill(0);
        noFill();
        stroke(255);
        strokeWeight(w/150);
        text(letters[counter],0,0);
        pop();
        
        
        counter++;        
        if (counter > letters.length - 1) {
          counter = 0;
        }        
        // switch (int(random(4))) {
        //   case 0:
        //     shapeGraphics.ellipse(i + w / 2, j + w / 2, w, w);
        //     break;
        //   case 1:
        //     shapeGraphics.rectMode(CENTER);
        //     shapeGraphics.rect(i + w / 2, j + w / 2, w, w);
        //     break;
        //   case 2:
        //     shapeGraphics.push();
        //     shapeGraphics.translate(i + w / 2, j + w / 2);
        //     shapeGraphics.rotate(int(random(4)) * 360 / 4);
        //     shapeGraphics.triangle(
        //       -w / 2, -w / 2,
        //       w / 2, -w / 2,
        //       w / 2, w / 2
        //     );
        //     shapeGraphics.pop();
        //     break;
        //   case 3:
        //     shapeGraphics.push();
        //     shapeGraphics.translate(i + w / 2, j + w / 2);
        //     shapeGraphics.rotate(int(random(4)) * 360 / 4);
        //     shapeGraphics.arc(-w / 2, -w / 2, w * 2, w * 2, 0, 90);
        //     shapeGraphics.pop();
        //     break;
        // }
      }
    }
  }
}

function drawPattern(_x, _y, _w, _h, _n, g) {
  g.stroke(255);
  for (let j = _y; j <= _y + _h; j++) {
    for (let i = _x; i <= _x + _w; i++) {
      let m = int(j * _w + i);
      if (m % _n == 0) {
        g.point(i, j);
      }
    }
  }
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