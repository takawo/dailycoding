// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {
//   background(20);

//   drawingContext.save(); //設定していない状態を保存
//   drawingContext.shadowColor = color(255);
//   drawingContext.shadowBlur = 100;
//   rect(50, 50, 200, 200);

//   //
//   drawingContext.restore(); //設定していない状態に復帰
//   rect(150, 150, 200, 200);
// }

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  push();
  drawingContext.shadowColor = color(0);
  drawingContext.shadowBlur = 100;
  rect(50, 50, 200, 200);
  pop();

  rect(150, 150, 200, 200);
}
//p5.jsのpush，popはそういえばmatrixの保存・呼び出しだけではなくて
//スタイルも保存呼び出しできたことを思い出してやってみたら出来ました．