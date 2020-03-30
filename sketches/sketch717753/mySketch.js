let classifier;
let w = 400;
let h = w;
let offset = w / 15;
let img;

function preload() {
  classifier = ml5.imageClassifier('MobileNet');
  let randomNum = int(random(100));
  let url = "https://picsum.photos/id/" + randomNum + "/" + w + "/" + h + "/";
  img = loadImage(url, imgLoadSuccess);
}

function imgLoadSuccess() {
  image(img, 0, 0);
  classifier.classify(img, gotResult);
}

function setup() {
  createCanvas(w * 2, h);
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 100);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
  for (let i = 0; i < results.length; i++) {
    text('Label: ' + results[i].label, w + offset, i * 40 + offset);
    text('Confidence: ' + nf(results[i].confidence, 0, 2), w + offset, i * 40 + offset + 20);
  }
}