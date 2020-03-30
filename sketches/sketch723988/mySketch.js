//forked from https://gist.github.com/lmccart/2273a047874939ad8ad1

let video;
let ctracker;

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
}

function draw() {
  clear();
  image(video, 0, 0);
  let positions = ctracker.getCurrentPosition();
  for (let i = 0; i < positions.length; i++) {
    fill(220, 80, 100);
    noStroke();
    let diameter = 5;
    ellipse(positions[i][0], positions[i][1], diameter, diameter);
  }
}