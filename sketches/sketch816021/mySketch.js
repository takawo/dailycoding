let osc;
let sliderVol;
let sliderFreq;
let button;
let mic;
let volArr = [];
let volMaxLength = 100;
function setup() {
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB,360,100,100,100);

  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(200);
  osc.amp(0.1);
  osc.start();
  
  sliderVol = createSlider(0, 1, 0.2, 1/100);
  sliderVol.size(200,20);
  sliderVol.position(20,20);
  sliderFreq = createSlider(0, 2000, 200, 1);
  sliderFreq.size(200,20);
  sliderFreq.position(20,40);
  
  mic = new p5.AudioIn();
  mic.start();  
}

function draw() {
  background(0,0,20,10);
  let vol = sliderVol.value();
  let freq = sliderFreq.value();
  osc.freq(freq);
  osc.amp(vol);
  
  let micLevel = mic.getLevel();
  let x = width/2;
  let y = height/2;
  noStroke();
  noFill();
  ellipse(x,y,d = micLevel*max(width,height)*2.5);
  for( let i = 0; i < volArr.length;i++){
    let xx = map(i,0,volMaxLength,width/2,0);
    rectMode(CENTER);
    fill((frameCount+xx/5)%360,80,100);
    rect(x+xx,y,width/400,volArr[i]);
    rect(x-xx,y,width/400,volArr[i]);
  }
  if(volArr.length > volMaxLength){
    volArr.shift();
  }
  volArr.push(d);

  fill(0,0,100);
  textFont("Helvetica");
  text("volume : " + int(vol*100)+" / 100",240,35);
  text("frequency : "+int(freq)+" hz",240,55);
}
