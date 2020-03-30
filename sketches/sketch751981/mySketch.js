let pallete = ["#847476", "#DA8DB9", "#847476", "#0E0E0F", "#2F3150", "#3ACBB2", "#FA9C45", "#FFFFFF"]

function setup() {
  //カンバスサイズの設定
  createCanvas(800, 800);
  //カラーモードの指定（HSB推奨）
  colorMode(HSB, 360, 100, 100, 100);

  //角度を弧度法から度数法に指定
  angleMode(DEGREES);
  //背景色を指定
  background(0, 0, 0);
  blendMode(ADD);

  let cells = int(random(8,15)); // 便宜上今回は8に
  // 上下左右の余白を設定
  let offset = width / 10;
  // 格子間の余白を設定
  let margin = 0; //offset / 4;
  // 2つの余白のサイズから格子の描画サイズを計算
  let w = sqrt(sq(width) + sq(height));
  let d = (w + offset * 2 - margin * (cells - 1)) / cells;

  push();
  translate(width / 2, height / 2);
  rotate(360 / 8);
  //格子状に図形を配置する基本的な方法
  //2重for文で縦横方向にxyの位置を計算し，その位置を基準に図形を配置する
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      //ステップごとに移動する位置座標を計算
      let x = -w / 2 - offset + i * (d + margin);
      let y = -w / 2 - offset + j * (d + margin);
      push();
      translate(x + d / 2, y + d / 2);
      rotate(int(random(4)) * 360/4);
      for (let n = 0; n < 10; n++) {
        let isArc = random(100) < 50;
        let angle = int(random(4)) * 360 / 4;
        rotate(angle);
        let dd = d / cells * (n%cells);
        stroke(random(pallete) + hex(128/cells, 2));
        fill(random(pallete) + hex(30, 2));
        strokeCap(SQUARE);
        strokeWeight(d / 200);
        if (n % 2 == 0) {
          arc(-d / 2, -d / 2, dd * 2, dd * 2, 0, 90);
          arc(d / 2, d / 2, dd * 2, dd * 2, 180, 180 + 90);
        } else {
          triangle(-d / 2, -d / 2, -d / 2 + dd, -d / 2, -d / 2, -d / 2 + dd);
          triangle(d / 2, d / 2, d / 2 - dd, d / 2, d / 2, d / 2 - dd);
        }
      }

      pop();
    }
  }
  pop();

  //画面上にたくさんの点を打つことで粒状感を背景に加える
  //点の密度，個数はカンバスのサイズに対して何％打つかを考えてみる
  for (let i = 0; i < width * height * 10 / 100; i++) {
    //半透明の点，白でも黒でもOK．透明度は適宜調整する
    fill(0, 0, 100, 3);
    noStroke();
    let px = random(width);
    let py = random(height);
    let pw = random(1, 3);
    let ph = random(1, 3);
    ellipse(px, py, pw, ph);
  }
}