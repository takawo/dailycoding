let cards = [];
let json;
let font;
let tSize = 150;

function preload() {
  json = loadJSON("cards.json", function() {
    let cardBack;
    for (let i = 0; i < Object.keys(json).length; i++) {
      if (i == 0) {
        cardBack = json[i].fromCodePoint;
      } else {
        let data = json[i];
        data.back = cardBack;
        data.isBack = random(100) > 50;
        if (data.unicode.substr(data.unicode.length - 1, 1) != "C") {
          cards.push(data);

        }
      }
    }
  });

  font = loadFont("NotoSansJP-Black.otf");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  background(120, 100, 40);

  for (let i = 0; i < cards.length; i++) {
    let x = random(width);
    let y = random(height);
    let str;
    if(cards[i].isBack){
    str = String.fromCodePoint(cards[i].back);
    }else{
    str = String.fromCodePoint(cards[i].fromCodePoint);
    }    
    let bounds = font.textBounds(str, 0, 0, width / 6);
    push();
    translate(x, y);
    translate(-bounds.x - bounds.w / 2, -bounds.y - bounds.h / 2);
    rotate(random(360));

    push();
    fill(0, 0, 100);
    noStroke();
    let rx = 5 * tSize / 100;
    let ry = 13 * tSize / 100;
    let rw = 60 * tSize / 100;
    let rh = -79 * tSize / 100;
    let rr = 3 * tSize / 100;
    drawingContext.shadowColor = color(0, 0, 0, 30);

    drawingContext.shadowBlur = tSize / 10;
    drawingContext.shadowOffsetX = tSize / 20;
    drawingContext.shadowOffsetY = tSize / 20;

    rect(rx, ry, rw, rh, rr);
    pop();
    let u = cards[i].unicode.substr(-2, 1);
    if ((u == "B" || u == "C") && !cards[i].isBack) {
      fill(0, 100, 100);
    } else {
      fill(0, 0, 0);
    }

    textSize(tSize);
    text(str, 0, 0);
    pop();
  }

  noLoop();
}