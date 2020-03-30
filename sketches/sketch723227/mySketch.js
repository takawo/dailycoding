let video;
let yolo;
let status;
let objects = [];
let count = 0;

function setup() {
  createCanvas(640, 480);
  colorMode(HSB, 360, 100, 100, 100);

  video = createCapture(VIDEO);
  video.size(width, height);
  yolo = ml5.YOLO(video, startDetecting);
  video.hide();
}


function draw() {
  image(video, 0, 0, width, height);
  let i = 0;
  for (let obj of objects) {
    let h = i/objects.length*360;
    noStroke();
    fill(h, 100, 100);
    text(obj.label + " " + nfc(obj.confidence * 100.0, 2) + "%", obj.x * width + 5, obj.y * height + 15);
    noFill();
    stroke(h, 100, 100);
    strokeWeight(4);
    rect(obj.x * width,
      obj.y * height,
      obj.w * width,
      obj.h * height);
    i++;
  }
}

function startDetecting() {
  //print("model loaded");
  detect();
}

function detect() {
  yolo.detect(function(err, results) {
    objects = results;
    detect();
  });
}