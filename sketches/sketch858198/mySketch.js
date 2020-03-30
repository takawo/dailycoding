/*
036_10 PRINT
*/
let pallete = ["#4D6F83", "#B1B0B1", "#278DD3", "#F8B623", "#3C494F", "#D51311", "#02020C"];

//10 PRINT CHR$(205.5+RND(1)); : GOTO 10
//は有名なプログラム
//簡単な仕組みで複雑なパターンができる

function setup() {
  createCanvas(800, 800); // 幅600px,高さ600px
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES); //角度指定を度数法に変更
	frameRate(0.5);
}

function draw() {
  background(0, 0, 95);

  let cells = int(random(3, 15));
  let offset = width / 15; //上下左右の余白
  let margin = 0; // offset / 15;
  let d = (width - offset * 2 - margin * (cells - 1)) / cells;


  //2重for文でXY方向に区画を繰り返す
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      drawingContext.shadowColor = color(0, 0, 0, 20);
      drawingContext.shadowBlur = d / 4;
      drawingContext.shadowOffsetX = d / 3;
      drawingContext.shadowOffsetY = d / 2;
      let x = offset + i * (d + margin);
      let y = offset + j * (d + margin);
      noFill();
      strokeWeight(d / 12);
      strokeCap(PROJECT);
      let c1 = random(pallete);
      let c2 = random(pallete);
      let c3 = random(pallete);
      while (c1 == c2 || c2 == c3 || c3 == c1) {
        c1 = random(pallete);
        c2 = random(pallete);
        c3 = random(pallete);
      }

      // rect(x,y,d,d);
      if (random(100) > 50) {
        let gradient = drawingContext.createLinearGradient(x, y, x + d, y + d);

        gradient.addColorStop(0.0, c1);
        gradient.addColorStop(0.5, c2);
        gradient.addColorStop(1.0, c3);

        //上で指定したグラデーション内容を塗りつぶしスタイルに代入する
        drawingContext.strokeStyle = gradient;
        // noStroke(); //線をナシに
        line(x, y, x + d, y + d);
        // arc(x,y,d*2,d*2,0,90);
      } else {
        let gradient = drawingContext.createLinearGradient(x + d, y, x, y + d);

        gradient.addColorStop(0.0, c1);
        gradient.addColorStop(0.5, c2);
        gradient.addColorStop(1.0, c3);

        //上で指定したグラデーション内容を塗りつぶしスタイルに代入する
        drawingContext.strokeStyle = gradient;
        // noStroke(); //線をナシに
        line(x + d, y, x, y + d);
        // arc(x+d,y+d,d*2,d*2,180,270);
      }
    }
  }
  // noLoop();
}

//10　PRINTは区画ごとの線が他の線とつながることでパターンができる