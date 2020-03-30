// noprotect
let img;
let cellMin = 5;
let cellMax = 20;

function preload() {
  let imgNum = int(random(10000));
  img = loadImage("https://loremflickr.com/800/800?random=" + imgNum);
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(255);
  let counter = 0;
  let rowCount = int(random(cellMin, cellMax));
  let rowHeight = height / rowCount;
  for (let j = 0; j < rowCount; j++) {
    let partCount = int(random(cellMin, cellMax));
    let parts = [];
    for (let i = 0; i < partCount; i++) {
      if (random(100) < 5.5) {
        let fragments = int(random(2, cellMax));
        partCount = partCount + fragments;
        for (let iii = 0; iii < fragments; iii++) {
          parts.push(random(2));
        }
      } else {
        parts.push(random(2, cellMax));
      }
    }
    let sumPartsTotal = 0;
    for (let ii = 0; ii < partCount; ii++) {
      sumPartsTotal += parts[ii];
    }
    let sumPartsNow = 0;
    for (let ii = 0; ii < parts.length; ii++) {
      sumPartsNow += parts[ii];
      let w = map(parts[ii], 0, sumPartsTotal, 0, width);
      let h = rowHeight;
      let x = map(sumPartsNow, 0, sumPartsTotal, 0, width)-w;
      let y = rowHeight * j;
      if (random(100) > 50) {
        for (let xx = x; xx < x + w; xx++) {
          let col = img.get(xx, y);
          stroke(col);
          line(xx, y, xx, y + h);
        }
      } else {
        for (let yy = y; yy < y + h; yy++) {
          let col = img.get(x, yy);
          stroke(col);
          line(x, yy, x + w, yy);
        }
      }
      counter++;
    }
  }
  noLoop();
  image(img, width - 100, height - 100, 100, 100);
}