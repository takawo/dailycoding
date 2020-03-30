//reference: Alexis Engelke's awesome article for PI Day. "Visualizing Pi"
//https://www.learning2.de/visual/pi/

let resultText;
let r;
let pastAngles = [];
let aAngleOffset = 1;
function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  r = width / 2 * 0.85;

  let piCalc = new PiCalculator(300*2, 15);
  resultText = piCalc.start();
  resultText = resultText.replace(".", "");
  // print(resultText);
}

function draw() {
  blendMode(BLEND);
  background(0, 0, 0);
  blendMode(ADD);
  push();
  translate(width / 2, height / 2);
	rotate(-90);
  for (let i = 0; i < resultText.length - 1; i++) {
    let n = parseInt(resultText.substr(i, 1));
    let m = parseInt(resultText.substr(i + 1, 1));
    let nAngle = n * 360 / 10;
    let mAngle = m * 360 / 10;
    nAngle += random(aAngleOffset,360/10-aAngleOffset);
    mAngle += random(aAngleOffset,360/10-aAngleOffset);
    let nx = cos(nAngle) * r;
    let ny = sin(nAngle) * r;
    let mx = cos(mAngle) * r;
    let my = sin(mAngle) * r;
    let distance = dist(nx, ny, mx, my);
    let angle = atan2(my - ny, mx - nx);

    let nnx = nx + cos(angle + 90) * distance / 4;
    let nny = ny + sin(angle + 90) * distance / 4;
    if (dist(nnx, nny, 0, 0) > r) {
      nnx = nx + cos(angle - 90) * distance / 4;
      nny = ny + sin(angle - 90) * distance / 4;
    }
    let mmx = mx + cos(angle + 90) * distance / 4;
    let mmy = my + sin(angle + 90) * distance / 4;
    if (dist(mmx, mmy, 0, 0) > r) {
      mmx = mx + cos(angle - 90) * distance / 4;
      mmy = my + sin(angle - 90) * distance / 4;
    }

    let gradient = drawingContext.createLinearGradient(nx, ny, mx, my);

    gradient.addColorStop(0, color(nAngle, 80, 100));
    gradient.addColorStop(1, color(mAngle, 80, 100));
    drawingContext.strokeStyle = gradient;
    noFill();
    // stroke((angle+180)%360, 100, 100,25);
    drawingContext.shadowColor = color(0, 0, 100, 50);
    drawingContext.shadowBlur = distance/10;
		strokeWeight(0.25);
    bezier(nx, ny, nnx, nny, mmx, mmy, mx, my);
    // fill(0,0,0,10);
    // ellipse(nx,ny,10,10);
  }
  for (let aAngle = 0; aAngle < 360; aAngle += 360 / 10) {
    stroke(aAngle, 80, 100);
    strokeWeight(5);
    // strokeCap(SQUARE);
    noFill();
    arc(0, 0, r * 2 * 1.02, r * 2 * 1.02, aAngle + aAngleOffset, aAngle + 360 / 10 - aAngleOffset);
  }

  pop();
  noLoop();
}

class CalcData {
  constructor() {
    var a0 = new Decimal(1.0);
    var b0 = (new Decimal(1.0)).dividedBy((new Decimal(2.0)).sqrt());
    var t0 = (new Decimal(1.0)).dividedBy(new Decimal(4.0));
    var p0 = new Decimal(1.0);

    this.a = a0;
    this.b = b0;
    this.t = t0;
    this.p = p0;
    this.n = 0;
  }
}


/**
 * 円周率計算クラス
 * @param precision 有効桁数
 * @param step ステップ数
 * 数が多いほど精度が高くなる。しかしその分計算時間がかかるようになる。
 * @constructor
 */

class PiCalculator {
  constructor(precision, step) {
    if (!precision || !step) {
      throw new Error("precision or step must be set!!");
    }
    this.precision = precision;
    this.step = step;
  }
  start() {
    Decimal.set({
      precision: this.precision,
      rounding: 1
    });

    var data = new CalcData();
    // console.log(data);
    for (var i = 0, len = this.step; i < len; i++) {
      data = this.stepCalc(data);
      // console.log('step', i, 'ended');
    }
    var pi = this.calcPi(data);

    //最大10万までの精度で返す
    return pi.toPrecision(this.precision);
  }
  stepCalc(data) {
    //現在の状態を仮保存
    var tempA = data.a;
    var tempB = data.b;
    var tempT = data.t;
    var tempP = data.p;

    data.a = this.calcA(tempA, tempB);
    data.b = this.calcB(tempA, tempB);
    data.t = this.calcT(tempA, data.a, tempT, tempP);
    data.p = this.calcP(tempP);

    data.n += 1;

    return data;
  }
  calcPi(data) {
    var a_plus_b = data.a.plus(data.b);
    var temp = (new Decimal(4.0)).times(data.t);
    return a_plus_b.times(a_plus_b).dividedBy(temp);
  }
  calcA(a_n, b_n) {
    return (a_n.plus(b_n)).times(0.5);
  }
  calcB(a_n, b_n) {
    return (a_n.times(b_n)).sqrt();
  }
  calcT(a_n, a_n1, t_n, p_n) {
    var tempA = a_n.minus(a_n1);
    return t_n.minus(p_n.times(tempA).times(tempA));
  }
  calcP(p_n) {
    return (new Decimal(2.0)).times(p_n);
  }
}