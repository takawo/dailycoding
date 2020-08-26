let faceapi;
let capture;
let balls = [];
let palette = ["#4D6F83", "#B1B0B1", "#278DD3", "#F8B623", "#3C494F", "#D51311", "#FDFDFD", "#02020C"];
let detections;
let faces = [];
let url = "https://coolors.co/ff99c8-fcf6bd-d0f4de-a9def9-e4c1f9";
let isReady = false;


const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
}

function setup() {
  createCanvas(640, 480);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  // palette = createPalette(url);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();
  faceapi = ml5.faceApi(capture, detection_options, modelReady)
}

function draw() {
  image(capture.get(), 0, 0, width, height);
  
  drawingContext.shadowColor = color(0, 0, 0, 33);
  drawingContext.shadowBlur = 10;
  drawingContext.shadowOffsetY = 10 / 2;
  
  if (detections) {
    if (detections.length > 0) {
      for (let i = 0; i < detections.length; i++) {
        let box = detections[i].detection._box;
        // box._width *= 1.2;
        // box._height *= 1.3;
        
        if (faces[i] == undefined) {
          let face = matter.makeBarrier(box._x + box._width / 2,
            box._y + box._height / 2,
            box._width,
            box._height);
          faces.push(face);
          //       face.show();
        } else {
          let face = faces[i];
          face.setPositionX(box._x + box._width / 2);
          face.setPositionY(box._y + box._height / 2);
          face.width=(box._width);
          face.height=(box._height);
          // face.show();
        }
      }
    }else{
      for(let face of faces){
        matter.forget(face);
      }
      faces = [];
    }
  }

  if (isReady && frameCount % 4 == 0) {
    let ball = matter.makeBall(random(width), random(-height / 4, 0), random(10,50));
    ball.color = random(palette);
    balls.push(ball);
  }

  for (let i = balls.length - 1; i >= 0; i--) {
    let ball = balls[i];
    let x = ball.getPositionX();
    let y = ball.getPositionY();
    fill(ball.color);
    noStroke();
    ball.show();
    if (x - ball.width / 2 > width || x + ball.width / 2 < 0 ||
      y - ball.height / 2 > height) {
      matter.forget(ball);
      balls.splice(i, 1);
    }
  }
}

function createPalette(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = color('#' + arr[i]);
  }
  return arr;
}


function modelReady() {
  // console.log('ready!')
  // console.log(faceapi)
  faceapi.detect(gotResults);
  isReady = true;
}

function gotResults(err, result) {
  if (err) {
    console.log(err)
    return
  }
  detections = result;
  faceapi.detect(gotResults)
}