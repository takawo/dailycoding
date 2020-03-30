// This code is refered from Agoston Nagy (@stc) his great tutorial.Thanks.
// https://github.com/stc/face-tracking-p5js

let video;
let ctracker;
let emotions;
let predictedEmotions;
let emotionData;
let icons = ["?","?","?","?","?","?"];

let offset, margin;
let cellW, cellH;

function setup() {
  createCanvas(640, 480);
  colorMode(HSB, 360, 100, 100, 100);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.position(0, 0);
  video.hide();

  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(video.elt);

  emotions = new emotionClassifier();
  emotions.init(emotionModel);
  emotionData = emotions.getBlank();

  offset = width / 10;
  margin = offset / 5;

}


function draw() {
  clear();
  image(video, 0, 0);

  fill(0, 0, 100, 50);
  rect(0, 0, width, height);

  positions = ctracker.getCurrentPosition();
  var cp = ctracker.getCurrentParameters();
  predictedEmotions = emotions.meanPredict(cp);

  cellW = (width - offset * 2 - margin * (predictedEmotions.length - 1)) / predictedEmotions.length;
  cellH = height / 8;

  if (emotions) {
    // andry=0, sad=1, surprised=2, happy=3
    for (var i = 0; i < predictedEmotions.length; i++) {

      let x = map(i, 0, predictedEmotions.length - 1, offset, width - offset - cellW);
      let y = height - margin*3;

      let h = map(i, 0, predictedEmotions.length, 0, 360);
      let s = sq(predictedEmotions[i].value) * 100;

      fill(h, s, 100);
      rect(x, y, cellW, -predictedEmotions[i].value * cellH);

      fill(0, 0, 20);
      textAlign(CENTER, CENTER);
      textSize(16);
      let label = Object.values(predictedEmotions[i])[0];
      text(label.toUpperCase(), x + cellW / 2, y + margin);
      
      if(predictedEmotions[i].value > 0.5){
        textSize(40);
        text(icons[i],x+cellW/2,y-predictedEmotions[i].value * cellH-25);
      }
    }
  }

  fill(220, 80, 40);
  noStroke();
  for (var i = 0; i < positions.length - 3; i++) {
    ellipse(positions[i][0], positions[i][1], 5, 5);
  }
}
