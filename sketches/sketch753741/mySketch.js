//格子状に図形を配置する（4-図形の色と格子の数をランダムに）

let colors = ["#555233", "#DF921D", "#878937", "#CFC52A", "#DC2A41"];

function setup() {
  //カンバスサイズの設定
  createCanvas(600, 600);
  //カラーモードの指定（HSB推奨）
  colorMode(HSB, 360, 100, 100, 100);

  //角度を弧度法から度数法に指定
  angleMode(DEGREES);
  //背景色を指定
  background(0, 0, 90);

  //画面上にたくさんの点を打つことで粒状感を背景に加える
  //点の密度，個数はカンバスのサイズに対して何％打つかを考えてみる
  for (let i = 0; i < width * height * 5 / 100; i++) {
    //半透明の点，白でも黒でもOK．透明度は適宜調整する
    stroke(0, 0, 0, 10);
    let px = random(width);
    let py = random(height);
    point(px, py);
  }

  let ww = sqrt(width * width  + height * height);
  
  let cells = int(random(3,12));
  let offset = width / 10;
  let margin = offset / 5;
  let w = (ww + offset * 2 - margin * (cells - 1)) / cells;
  let h = (ww + offset * 2 - margin * (cells - 1)) / cells;
  
  push();
  translate(width/2,height/2);
  rotate(45);
  //格子状に図形を配置する基本的な方法
  //2重for文で縦横方向にxyの位置を計算し，その位置を基準に図形を配置する
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = -ww/2 - offset + i * (w + margin);
      let y = -ww/2 - offset + j * (h + margin);
      let cx = x + w / 2;
      let cy = y + h / 2;
      let d = w;
      let rotate_num = int(random(4)); // 0〜3の整数
      rotate_num = rotate_num * 90; // 0,90,180,270
      let shape_num = int(random(4));

      let c = random(colors);

      push();
      translate(cx, cy);
      rotate(rotate_num);
      if (random(100) > 50) {
        noStroke();
        fill(c);
      } else {
        noFill();
        stroke(c);
      }
      if (shape_num == 0) {
        triangle(-d / 2, -d / 2, d / 2, -d / 2, -d / 2, d / 2);
      } else if (shape_num == 1) {
        rectMode(CENTER);
        rect(0, 0, d, d);
      } else if (shape_num == 2) {
        ellipse(0, 0, d, d);
      } else if (shape_num == 3) {
        arc(-d / 2, -d / 2, d * 2, d * 2, 0, 90);
      }
      pop();
    }
  }
  pop();
}