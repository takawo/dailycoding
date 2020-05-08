//reference: http://www.kuma-de.com/blog/2017-12-23/7386

let resultText;
let speech;
let count = 0;
let tSize = 30;

function preload() {
  let piCalc = new PiCalculator(3000, 15);
  resultText = piCalc.start();
  speech = new p5.Speech(); // speech synthesis object
	speech.setRate(1.2);
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  // speech.setVoice(voice)

}

function draw() {
  background(0, 0, 95);
  textSize(tSize);
  textFont("monospace");

  let offset = width / 10;
  let xStep = int((width - offset * 2) / tSize);
  let yStep = int((height - offset * 2) / tSize);
  let n = 0;
  for (let j = 0; j < yStep; j++) {
    for (let i = 0; i < xStep; i++) {
      let x = offset + i * tSize;
      let y = offset + j * tSize;
      let str = resultText.substr(n, 1);
      if (n == count) {
        fill(0, 100, 100);
      } else {
        fill(0, 0, 20);
      }
      textAlign(CENTER, CENTER);
      textSize(tSize);
      text(str, x + tSize / 2, y + tSize / 2);
      n++;
    }

  }
  speech.speak(resultText.substr(count % resultText.length, 1));
  if (count == 1) {
    speech.speak("ten");
  }
  frameRate(1.2);
  count++;
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