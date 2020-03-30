// noprotect
function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 0);
  //blendMode(MULTIPLY);
}

function draw() {
  for (let i = 0; i < 10; i++) {
    let graphics = createGraphics(width, height);
    drawEmojiPattern(graphics, "?", int(width / 13), width, height, 1 / 8000);
    tint(random(250, 330), 100, 100);
    filter(BLUR, 1);
    image(graphics, 0, 0);
  }
  noLoop();
}

function drawEmojiPattern(graphics, emoji, emojiSize, areaWidth, areaHeight, percent) {

  for (let i = 0; i < areaWidth * areaHeight * percent; i++) {
    let x = random(areaWidth);
    let y = random(areaWidth);
    graphics.push();
    graphics.translate(x, y);
    graphics.rotate(random(360));
    graphics.textSize(emojiSize);
    graphics.textAlign(CENTER, CENTER);
    graphics.shearX(random(-1 / 2, 1 / 2));
    graphics.shearY(random(-1 / 3, 1 / 3));
    graphics.text(emoji, 0, 0);
    graphics.pop();
  }
}