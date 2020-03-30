//いわゆるステップシーケンサー
let current = 0;
let cols = 16;
let rows = 8;
let offset = 50;
let sounds = [];
let checkboxes = [];

function preload() {
  for (let i = 0; i < rows; i++) {
    sounds[i] = loadSound("00" + i + "_AMENCUT_00" + (i + 1) + ".wav");
  }
}

function setup() {
  createCanvas(850, 400);
  colorMode(HSB, 360, 100, 100, 100);

  //格子状にチェックボックスを作る
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      //x,yの値を画面幅から設定（offset〜幅・高さ-offset）
      let x = map(i, 0, cols, offset, width - offset);
      let y = map(j, 0, rows, offset, height - offset);
      //チェックボックスを作成
      checkboxes[i + j * cols] = createCheckbox();
      //チェックボックスの位置を格子状に
      checkboxes[i + j * cols].position(x, y);
      checkboxes[i + j * cols].style("transform", "scale(1.5)");
      checkboxes[i + j * cols].style("vertical-align", "middle");
      checkboxes[i + j * cols].style("text-align", "center");

    }
  }
  frameRate(8);
}

function draw() {
  blendMode(BLEND);
  background(0, 0, 0, 30);
  blendMode(ADD);
  //（行ではなく）列ごとのチェックボックスを走査
  for (let i = 0; i < rows; i++) {
    //今見ているのはn番目の配列
    let n = cols * i + current;
    //チェックボックスがチェックされているか

    let isChecked = checkboxes[n].checked();
    if (isChecked) {
      sounds[i].play();
      let rx = map(current, 0, cols, offset, width - offset);
      let ry = map(i, 0, rows, offset, height - offset);
      let h = map(i, 0, rows, 180, 360);
      push();
      fill(h, 80, 100, 50);
      rectMode(CENTER);

      rect(rx + 8, ry + 10, 50, 50, 5);
      pop();
    }

  }
  let x = map(current, 0, cols, offset, width - offset);
  fill(0, 0, 50, 50);
  noStroke();
  //この辺適当
  rectMode(CENTER);
  rect(x + 8, height / 2, 25, height);
  //現在の値を1足してcolsを越えたら0に戻る
  current = current + 1;
  if (current == cols) {
    current = 0;
  }
}

function keyPressed() {
  //DELETEキーを押したらチェックをすべてリセット
  if (keyCode == DELETE || keyCode == 8) {
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked(false);
    }
  }
	//
  for (let i = 0; i <= rows; i++) {
    if (key == i.toString()) {
      let isChecked = checkboxes[(i-1) * cols + current].checked();
      checkboxes[(i-1) * cols + current].checked(!isChecked);
    }
  }
}