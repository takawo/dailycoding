//This code is  ported from  Haruka Kajita's awesome noise sketch written in Processing.
//https://github.com/HarukaKajita/NoiseFlow


let aNum = 10000;
let agents = [];
let nS; //noise scale
let maxRot; //width of rotation change with noise.
let delta = 1; //distance which particles move in 1frame.

function setup() {
  createCanvas(600, 600);
  background(0);
  stroke(255, 20);
  smooth();
  strokeWeight(2);
  
  nS = random(random(random(1)))/10;
  maxRot = int(random(1,5));
  
  initPos();
}

function draw() {
  updatePos();
}

function initPos() {
  for (let i = 0; i < aNum; i++) {
    agents[i] = createVector(random(-50, width + 50), random(-50, height + 50));
  }
}

function updatePos() {
  for (let i = 0; i < aNum; i++) {
    let n = fbm(agents[i].copy().mult(nS));
    let a = n * TWO_PI * maxRot;
    let pre = agents[i];
    agents[i].x += cos(a) * delta;
    agents[i].y += sin(a) * delta;
    line(pre.x, pre.y, agents[i].x, agents[i].y);
  }
}

function keyPressed(){
  if(key == 's'){
    let fileName = nf(year(),4)+"_"+nf(month(),2)+"_"+nf(day(),2)+"_"+nf(hour(),2)+"_"+nf(minute(),2)+"_"+nf(second(),2);    
    saveCanvas(fileName +".png");
  }
}


/////////////////////////////////
// Noise functions and some functions which is needed for noise functions.
//
// These are 2D noise. if you need 3DNoise functions, you need to fix functions.
// Argument is let variable.
// Return is let (0~1)
//
// function perlineNoise (vec) {}
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
function perlineNoise(pos) {
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

    ret += perlineNoise(uv.copy().mult(fre)) * amp;
    fre *= freqIncrease;
    maxValue += amp;
    amp *= gain;
  }
  return ret / maxValue;
}