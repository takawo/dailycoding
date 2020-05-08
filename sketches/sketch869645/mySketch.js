let tiles = [];
let json;
let tSize;
let font;

let mahjong = {
  x: 5,
  y: -66,
  w: 68,
  h: 91,
  r: 8,
  standard: 100,
  correctRatio: 1.3
}

function preload() {
  json = loadJSON("mahjong.json", function() {
    for (let i = 0; i < Object.keys(json).length; i++) {
      let data = json[i];
      if (data.unicode != "1F004" && data.fromCodePoint < 127009) {
        tiles.push(data);
      }
    }
  });
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  tSize = width / 13;
}

function draw() {
  background(120, 80, 50);
  push();
  translate(0, 55);
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 13; i++) {
      let x1 = i * width / 13;
      let y1 = j * height / 10;
      push();
      translate(x1, y1);
      let ratio = tSize / mahjong.standard;
      let x = ratio * mahjong.x * mahjong.correctRatio;
      let y = ratio * mahjong.y * mahjong.correctRatio;
      let w = ratio * mahjong.w * mahjong.correctRatio;
      let h = ratio * mahjong.h * mahjong.correctRatio;
      let r = ratio * mahjong.r * mahjong.correctRatio;
      noStroke();
      push();
      drawingContext.shadowColor = color(0,0,100);
      drawingContext.shadowBlur = tSize/10;
      rect(x, y, w, h, r);
      pop();
      
      push();
      textSize(tSize * mahjong.correctRatio);
      drawingContext.shadowColor = color(0,0,0,20);
      drawingContext.shadowBlur = tSize/8;
      drawingContext.shadowOffsetX = tSize/20;
      drawingContext.shadowOffsetY = tSize/20;
      let n = int(map(noise(x1,y1,frameCount/50),0,1,0,tiles.length));
      text(String.fromCodePoint(tiles[n].fromCodePoint), 0, 0);
      pop();
      pop();
    }
  }
  pop();
  // noLoop();
}