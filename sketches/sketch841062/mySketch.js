function setup() {
  pixelDensity(1);
  createCanvas(800, 800, SVG);
  angleMode(DEGREES);
  strokeWeight(0.1); 
  stroke(255, 0, 0);
  noFill();
}

function draw() {
  let offset = width / 10;
  let margin = offset / 5;
  let cells = int(random(3, 8));
  let d = (width - offset * 2 - margin * (cells - 1)) / cells;
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (d + margin);
      let y = offset + j * (d + margin);
      push();
      translate(x + d / 2, y + d / 2);
      // rectMode(CENTER);
      // rect(0,0,d,d);
      ellipse(0,0,d,d);
      pop();
    }
  }
  //save("mySVG.svg"); // give file name
  //print("saved svg");
  noLoop(); // we just want to export once
}