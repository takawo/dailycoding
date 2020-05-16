let canvas;

function setup() {
  canvas = createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

}

function draw() {
  blendMode(BLEND);
  background(0, 0, 20);
  // blendMode(BURN);
  let size = sqrt(width * width + height * height);
    push();
    translate(width / 2, height / 2);
    rotate(int(random(8)) * 360 / 8);
    push();
    translate(-size / 2, -size / 2);
    let x = 0;
    let y = 0;
    while (y < size) {
      x = 0;
      let h = random(size / 10, size / 5);
      while (x < size) {
        let w = random(size / 10, size / 5);
        push();
        translate(x + w / 2, y + h / 2);
        let rotate_num = int(random(4));
        let ww = w;
        let hh = h;
        if (rotate_num % 2 == 1) {
          ww = h;
          hh = w;
        }
        let c = color(random(360),40,100);
        noStroke();
        fill(c);
        rotate(rotate_num * 360 / 4);
        drawingContext.shadowColor = color((hue(c)+180)%360,40,100);
        drawingContext.shadowBlur = min(w, h)/5;
        drawingContext.shadowOffsetX = max(w, h) / 10;
        drawingContext.shadowOffsetY = max(w, h) / 20;
        switch (int(random(4))) {
          case 0:
            triangle(-ww / 2, -hh / 2, ww / 2, -hh / 2, ww / 2, hh / 2);
            break;
          case 1:
            rect(-ww / 2, -hh / 2, ww, hh);
            break;
          case 2:
            ellipse(0, 0, ww, hh);
            break;
          case 3:
            arc(-ww / 2, -hh / 2, ww * 2, hh * 2, 0, 90, PIE);
            break;
        }
        pop();
        x += w;
      }
      y += h;
    }

    pop();
    pop();
  canvas.elt.style.filter = "blur(5px) contrast(5)";
  frameRate(0.5);
  // noLoop();
}


function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}