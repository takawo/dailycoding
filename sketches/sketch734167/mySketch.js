let sound;
let fft;
let mic;
function preload() {
  sound = loadSound('Damscray_DancingTiger.mp3');
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  mic = new p5.AudioIn();
  mic.start();
  
  fft = new p5.FFT();
  fft.setInput(mic);  
}

function draw() {
  background("#00CCC0");
  let spectrum = fft.analyze();

  noStroke();
  fill("#D9ED78");
  let step = 1;
  for (let i = 0; i < spectrum.length; i+= step) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length*step, h)
  }

  let waveform = fft.waveform();
  noFill();
  beginShape();
  noStroke();
  fill("#EDEEEE");
  strokeJoin(ROUND);
  strokeWeight(1);
  for (let i = 0; i < waveform.length; i+=step) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = height/2 + map(waveform[i], -1, 1, -height/2, height/2);
    vertex(x, y);
  }
  vertex(width,height/2);
  vertex(width,0);
  vertex(0,0);
  endShape(CLOSE);
}

function mousePressed() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.play();
  }
}