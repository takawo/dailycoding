let emojiArr;
let func = ["perlinNoise", "valueNoise", "cellularNoise", "fbm"];
//This code is  ported from  Haruka Kajita's awesome noise sketch written in Processing.
//https://github.com/HarukaKajita/NoiseFlow

let moverNum = 100;
let movers = [];
let aNum = 100;
let agents = [];
let nS; //noise scale
let maxRot; //width of rotation change with noise.
let delta; //distance which particles move in 1frame.
let offset;
let func_num;
let bg;
let graphics;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  init()
}

function init() {
  emojiArr = createEmojiArr();
  background(0, 0, 80);
  graphics = createGraphics(width, height);
  drawNoiseBackground(10000, graphics);
  image(graphics, 0, 0);
  offset = width / 10;
  nS = random(random(random(1))) / 15;
  maxRot = int(random(2, 5)) * 2;
  delta = 0.5;
  func_num = int(random(func.length));

  for (let i = 0; i < moverNum; i++) {
    let x = random(offset, width - offset);
    let y = random(offset, height - offset);
    let s = random(emojiArr);
    movers.push(new Mover(x, y, s));
  }
}

function draw() {
  for (let mover of movers) {
    mover.update();
    mover.display();
  }

  for (let i = movers.length - 1; i >= 0; i--) {
    let mover = movers[i];
    if (mover.life == 0) {
      movers.splice(i, 1);
    }
  }
  for (let i = movers.length; i < moverNum; i++) {
    let angle = random(360);
    let x = random(width);
    let y = random(height);
    movers.push(new Mover(x, y));
  }
}


class Mover {
  constructor(_x, _y, _str) {
    this.pos = createVector(_x, _y);
    this.size = int(random(1, 5)) * 5;
    this.graphics = createGraphics(this.size, this.size);
    this.str = _str;
    while(this.str == undefined){
      this.str = random(emojiArr);
    }
    this.graphics.textAlign(CENTER, CENTER);
    this.graphics.textSize(this.size);
    this.graphics.text(this.str, this.size / 2, this.size / 2);
    this.prev_pos = this.pos.copy();
    this.life = random(random(random(3)));
    this.count = int(random(1, 10));
    this.angle = random(360);
  }
  update() {

    let noiseFunc = func[func_num] + "(this.pos.copy().mult(nS))";
    let n = eval(noiseFunc);
    let a = n * 360 * maxRot;
    this.angle += a / 500;
    this.prev_pos = this.pos.copy();

    this.pos.x += cos(a) * delta;
    this.pos.y += sin(a) * delta;
    this.pos.x = constrain(this.pos.x, offset, width - offset);
    this.pos.y = constrain(this.pos.y, offset, height - offset);
    this.life -= 1 / 1000;
    this.life = constrain(this.life, 0, 1);
  }
  display() {
    //     strokeWeight(map(this.life, 0, 1, 0, 3));
    //     stroke(this.c);
    //     noFill();

    //     point(this.pos.x, this.pos.y);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.graphics, 0, 0, this.life * 30, this.life * 30);
    pop();
    if (this.pos.x != this.prev_pos.x && this.pos.y != this.prev_pos.y) {

    } else {
      this.pos = createVector(random(offset, width - offset), random(offset, height - offset));
    }

  }
}

/////////////////////////////////
// Noise functions and some functions which is needed for noise functions.
//
// These are 2D noise. if you need 3DNoise functions, you need to fix functions.
// Argument is let variable.
// Return is let (0~1)
//
// function perlinNoise (vec) {}
// function valueNoise (vec) {}
// function cellularNoise (vec) {}
// function fbm (vec) {}

//vector
function floorVec(vec) {
  let copy = vec.copy();
  copy.x = floor(copy.x);
  copy.y = floor(copy.y);
  copy.z = floor(copy.z);
  return copy;
}

//float
function fracFloat(f) {
  return f - floor(f);
}

//vector
function fracVec(vec) {
  let copy = vec.copy();
  copy.x = fracFloat(copy.x);
  copy.y = fracFloat(copy.y);
  copy.z = fracFloat(copy.z);
  return copy;
}

//vector
function sinVec(vec) {
  let copy = vec.copy();
  copy.x = sin(copy.x);
  copy.y = sin(copy.y);
  copy.z = sin(copy.z);
  return copy;
}
//float
function rand(n) {
  return fracFloat(sin(n) * 43758.5453123);
}

//vector
function randVec(vec) {
  let copy = vec.copy();
  return rand(copy.dot(createVector(12.9898, 78.2335, 45.6345)));
}
//vector
function rand2D(st) {
  let copy = st.copy();
  copy = createVector(copy.dot(createVector(127.1, 311.7)),
    copy.dot(createVector(269.5, 183.3)));
  return fracVec(sinVec(copy).mult(43758.5453123)).mult(2.0).add(createVector(-1, -1, 0));
}

//float
function saturate(x) {
  if (x > 1) {
    return 1;
  } else if (x < 0) {
    return 0;
  } else {
    return x;
  }
}

//float,float,float 
function smoothstep(edge0, edge1, x) {
  let t; /* Or genDType t; */
  t = saturate((x - edge0) / (edge1 - edge0));
  return t * t * (3.0 - 2.0 * t); // let 
}
//vector,vector,vector
function smoothstepVec(edge0, edge1, vec) {
  let copy = vec.copy();
  copy.x = smoothstep(edge0.x, edge1.x, vec.x);
  copy.y = smoothstep(edge0.y, edge1.y, vec.y);
  copy.z = smoothstep(edge0.z, edge1.z, vec.z);
  return copy;
}

//vector
function valueNoise(uv) {
  let copy = uv.copy();
  let i = floorVec(copy);
  let f = fracVec(copy);

  let zero = createVector(0, 0, 0);
  let one = createVector(1, 1, 1);

  let sm = smoothstepVec(zero, one, f);

  //o = origin
  let rand_o = randVec(i);
  let rand_x = randVec(i.copy().add(createVector(1.0, 0.0)));
  let rand_y = randVec(i.copy().add(createVector(0.0, 1.0)));
  let rand_xy = randVec(i.copy().add(createVector(1.0, 1.0)));

  let value_x = lerp(rand_o, rand_x, sm.x);
  let value_y1 = lerp(0, rand_y - rand_o, sm.y);
  let value_y2 = lerp(0, rand_xy - rand_x, sm.y);
  let value_y = lerp(value_y1, value_y2, sm.x); //1と2をブレンド
  return value_x + value_y;
}

//vector
function perlinNoise(pos) {
  let copy = pos.copy();
  let i_o = floorVec(copy);
  let f = fracVec(copy);

  let zero = createVector(0, 0, 0);
  let one = createVector(1, 1, 1);

  let sm = smoothstepVec(zero, one, f);

  let i_x = i_o.copy().add(createVector(1, 0));
  let i_y = i_o.copy().add(createVector(0, 1));
  let i_xy = i_o.copy().add(createVector(1, 1));
  let rand_o = rand2D(i_o);
  let rand_x = rand2D(i_x);
  let rand_y = rand2D(i_y);
  let rand_xy = rand2D(i_xy);

  let toPos_o = copy.copy().sub(i_o);
  let toPos_x = copy.copy().sub(i_x);
  let toPos_y = copy.copy().sub(i_y);
  let toPos_xy = copy.copy().sub(i_xy);

  let dot_o = rand_o.dot(toPos_o) * 0.5 + 0.5;
  let dot_x = rand_x.dot(toPos_x) * 0.5 + 0.5;
  let dot_y = rand_y.dot(toPos_y) * 0.5 + 0.5;
  let dot_xy = rand_xy.dot(toPos_xy) * 0.5 + 0.5;

  let value1 = lerp(dot_o, dot_x, sm.x);
  let value2 = lerp(dot_y, dot_xy, sm.x);
  let value3 = lerp(0, value2 - value1, sm.y);
  return value1 + value3;
}

//vector
function cellularNoise(pos) {
  let copy = pos.copy();
  let i_o = floorVec(copy);

  let minDist = 10000;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let neighbor = i_o.copy().add(createVector(i, j, 0));
      let random = neighbor.copy().add(rand2D(neighbor).mult(0.5).add(createVector(0.5, 0.5, 0)));
      let dist = (copy.copy().sub(random)).mag();
      if (dist < minDist) minDist = dist;
    }
  }
  return minDist / 1.41421356;
}

//vector
function fbm(uv) {
  let gain = 0.5;
  let freqIncrease = 2.0;
  let octaves = 3;

  //default value
  let amp = 0.5;
  let fre = 1.0;

  let ret = 0.0; //return
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {

    ret += perlinNoise(uv.copy().mult(fre)) * amp;
    fre *= freqIncrease;
    maxValue += amp;
    amp *= gain;
  }
  return ret / maxValue;
}

function drawNoiseBackground(_n, _graphics) {
  let c = color(0, 0, 0, 10);
  for (let i = 0; i < _n; i++) {
    let x = random(1) * width;
    let y = random(1) * height;
    let w = random(1, 3);
    let h = random(1, 3);
    _graphics.noStroke();
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}

function createEmojiArr() {
  let arr = [];
  let emoji;
  for (let i = 128512; i < 128592; i++) {
    emoji = String.fromCodePoint(i);
    arr.push(emoji);
  }
  for (let i = 127744; i < 128318; i++) {
    emoji = String.fromCodePoint(i);
    arr.push(emoji);
  }
  return arr;
}