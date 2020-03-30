let font;

function preload() {
  font = loadFont("Lato-Black.ttf");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  background(0, 0, 0);
  let tsize = width * 1;
  let str = 'A';
  textSize(tsize);
  textAlign(CENTER, CENTER);
  textFont(font);
  fill(0, 0, 30, 50);
  text(str, width / 2, height / 2 - height / 8);
  let points = font.textToPoints(str, 0, 0, tsize, {
    sampleFactor: .5,
    simplifyThreshold: 0
  });
  let bound = font.textBounds(str, 0, 0, tsize);

  push();
  translate(width / 2, height / 2 - height / 8);
  translate(bound.x * 1.0, -bound.y * 2.1);

  let f = 0;
  for (let i = 0; i < points.length - 1; i++) {
    let current = points[i];
    let next = points[i + 1];
    let distance = dist(current.x, current.y,
      next.x, next.y);
    let angle = atan2(next.y - current.y, next.x - current.x);
    push();
    translate(current.x, current.y);
    rotate(angle);
    for (let x2 = 0; x2 < distance; x2 += 1) {
      noStroke();
      fill(0, 0, 100, 1);
      let y2 = sin(f*3) * tsize / 50;
      if (distance < tsize / 10) {
        ellipse(x2, y2, y2 * 2, y2 * 2);
      }
    }
    pop();
    f += 2;

  }

  // let i = 0;
  // for (let p of points) {
  //   for (let q of points) {
  //     if(p != q){
  //       let distance = dist(p.x,p.y,q.x,q.y);
  //       if(distance < tsize/10){
  //         stroke(0,100,100,1);
  //         line(p.x,p.y,q.x,q.y);
  //       }
  //     }
  //   }
  // }

  // for (let p of points) {
  //   circle(p.x, p.y, int(random(1, 10)) * 5);
  //   // textSize(10);
  //   // text(i, p.x, p.y);
  //   i++;
  // }



  pop();
}