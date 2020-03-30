let emojiStrArr = [];
let emojis = [];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 90);
  for (let i = 128512; i < 128512 + 55; i++) {
    let emoji = String.fromCodePoint(i);
    emojiStrArr.push(emoji);
  }
  emojis.push(new Emoji(width / 2, height / 2, min(width, height) / 5,random(emojiStrArr)));
}

function draw() {
  background(0);
  
  // All the emojis
  for (var i = 0; i < emojis.length; i++) {
    var c = emojis[i];
    c.display();
    
    if (c.alive) {
      c.update();
      for (var j = 0; j < emojis.length; j++) {
        var other = emojis[j];
        if (other != c) {
          var d = dist(c.x, c.y, other.x, other.y);
          if (d - 1 < c.r + other.r) {
            c.alive = false;
          }
        }
      }
      
      if (c.alive) {
        c.alive = !c.edges();
      }
    }
  }
  
  var target = 1 + constrain(floor(frameCount / 120), 0, 20);
  var count = 0;
  for (var i = 0; i < 1000; i++) {
    if (addEmoji()) {
      count++;
    }
    if (count == target) {
      break;
    }
  }
  if (count < 1) {
    noLoop();
    console.log("finished!!!");
  }
}

class Emoji {
  constructor(x, y, r,str) {
    this.alive = true;
    this.x = x;
    this.y = y;
    this.r = r;
    this.emoji = str;
  }
  edges() {
    return (this.r > width - this.x || this.r > this.x || this.r > height - this.y || this.r > this.y);
  }
  update() {
    this.r += 0.5;
  }
  display() {
    push();
    translate(this.x,this.y);
    textAlign(CENTER,CENTER);
    textSize(this.r*2*1.05);
    text(this.emoji,0,this.r/4);
    pop();
  }
}

function addEmoji() {
  var newemoji = new Emoji(random(width), random(height), 1,random(emojiStrArr));
  for (var i = 0; i < emojis.length; i++) {
    var other = emojis[i];
    var d = dist(newemoji.x, newemoji.y, other.x, other.y);
    if (d < other.r + 4) {
      newemoji = undefined;
      break;
    }
  }
  if (newemoji) {
    emojis.push(newemoji);
    return true;
  } else {
    return false;
  }
}