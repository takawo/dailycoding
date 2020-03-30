// This code is refered from Agoston Nagy (@stc) his great tutorial.Thanks.
// https://github.com/stc/face-tracking-p5js

let video;
let ctracker;
let emotions;
let predictedEmotions;
let emotionData;
let icons = ["?", "?", "?", "?"];
let icon;
let offset, margin;
let cellW, cellH;

function setup() {
  createCanvas(640, 480);
  colorMode(HSB,360,100,100,100);
  angleMode(DEGREES);
  
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.position(0, 0);
  video.hide();

  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(video.elt);

  delete emotionModel['disgusted'];
  delete emotionModel['fear'];

  emotions = new emotionClassifier();
  emotions.init(emotionModel);
  emotionData = emotions.getBlank();

  offset = width / 10;
  margin = offset / 3;
}


function draw() {
  image(video, 0, 0);

  fill(0, 0, 100, 40);
  rectMode(CORNER);
  rect(0, 0, width, height);

  positions = ctracker.getCurrentPosition();
  var cp = ctracker.getCurrentParameters();
  predictedEmotions = emotions.meanPredict(cp);

  cellW = (width - offset * 2 - margin * (predictedEmotions.length - 1)) / predictedEmotions.length;
  cellH = height / 8;

  let maxEmotionNum = -1;
  let maxEmotionValue = 0;

  if (emotions) {
    for (var i = 0; i < predictedEmotions.length; i++) {

      let currentMaxEmotionValue = max(predictedEmotions[i].value, maxEmotionValue);

      if (predictedEmotions[i].value > maxEmotionValue) {
        maxEmotionValue = predictedEmotions[i].value;
        maxEmotionNum = i;
      }

      let x = map(i, 0, predictedEmotions.length - 1, offset, width - offset - cellW);
      let y = height - margin * 3;

      let h = map(i, 0, predictedEmotions.length, 0, 360);
      let s = sq(predictedEmotions[i].value) * 100;

      noStroke();
      fill(h, s, 100);
      rectMode(CORNER);
      rect(x, y, cellW, -predictedEmotions[i].value * cellH);

      noStroke();
      fill(0, 0, 20);
      textAlign(CENTER, CENTER);
      textSize(13);
      let label = Object.values(predictedEmotions[i])[0];
      text(label.toUpperCase(), x + cellW / 2, y + margin);
    }
  }


  if (maxEmotionNum == -1 || predictedEmotions[maxEmotionNum].value < 0.3) {
    icon = "?";
  } else {
    icon = icons[maxEmotionNum];
  }

  if (positions.length > 0) {
    let p1 = createVector(positions[7][0], positions[7][1]);
    let p2 = createVector(positions[33][0], positions[33][1]);

    let angle = atan2(p2.y - p1.y, p2.x - p1.x);
    push();
    translate(positions[37][0], positions[37][1]);
    rotate(angle+90);
    var txtSize = p1.dist(p2);
    textSize(txtSize * 1.8);
    text(icon, 0, 0);
    pop();
  }
}