let ns = 80;
let graphics;
let pallete = ["#030B45","#DCB15B","#E2656F","#CD9B98","#1840A4","#F5E39E"];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  //粒状感のレイヤー
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);

  //画面の15%に粒子を5%の透明度で描画
  graphics.fill(0, 0, 100, 5);
  graphics.noStroke();
  for (let i = 0; i < graphics.width * graphics.height * 15 / 100; i++) {
    graphics.ellipse(
      random(graphics.width),
      random(graphics.height),
      random(3),
      random(3)
    );
  }
}

function draw() {
   background(0,0,20);
 //画面を覆うため対角線の長さを計算
  let w = sqrt(sq(width) + sq(height));

  push();
  translate(width / 2, height / 2);
  //予め画面を回転させておく
  rotate(int(random(8)) * 360 / 8);
  //分割
  separateGrid(-w / 2, -w / 2, w);
  pop();
  //粒状感を乗せる
  image(graphics, 0, 0);
  noLoop();
}

//sキーで保存，それ以外は再描画
function keyPressed() {

  if (key == "s" || key == "S") {
    let fileName = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second();
    save("img" + fileName + ".png");
  }
  redraw();
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 5));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      let n = noise(i / ns, j / ns, frameCount / ns);
      if (n > 0.25 && d > width / 5) {
        separateGrid(i, j, w);
      } else {
        drawWave(i, j, w);

      }
    }
  }
}

// @reona396
function drawWave(x, y, w) {
  push();
  translate(x + w / 2, y + w / 2);
  rotate(int(random(4)) * 360 / 4);
  translate(-w / 2, -w / 2);
  let g = createGraphics(w, w);
  g.colorMode(HSB, 360, 100, 100, 100);
  g.angleMode(DEGREES);
  g.noStroke();
  g.rect(0, 0, w, w);
  let ww = sqrt(sq(w)*2);
  g.push();
  g.translate(w/2,w/2);
  g.rotate(45);
  let sep = int(random(3,10));
  for(let j = -ww/2; j < ww/2; j+= ww/sep){
    g.beginShape();
    g.fill(random(pallete));
    let ns = int(random(map(w,0,width/5,100,800)));
  for(let i = -ww/2; i < ww/2; i++){
    g.vertex(i,j+map(noise((x+j)/ns,(y+i)/ns),0,1,-1,1)*ww/5);
  }
    g.vertex(ww,ww);
    g.vertex(-ww,ww);
    g.endShape(CLOSE);
  }
  imageMode(CENTER);
  image(g,g.width/2,g.height/2,g.width-5,g.height-5);
  pop();
}