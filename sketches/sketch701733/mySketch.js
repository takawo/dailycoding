// This code is inspired by @naoto_hieda's tweet.
//　https://twitter.com/naoto_hieda/status/1119877894145179649

//cooloｒｓのURL
let url = "https://coolors.co/app/1ef8d5-440381-ec368d-ffa5a5-ffd6c0";
//カラーパレットの配列
let pallete;

function setup() {
  createCanvas(800, 800);

  //カラーパレットを生成
  pallete = createPallete(url);
}

function draw() {
  background(128);
  let offset = width / 15;
  let w = (width - offset * 2) / pallete.length;
  let h = (height - offset * 2);
  for (let i = 0; i < pallete.length; i++) {
    let x = offset + w * i;
    let y = offset;
    fill(pallete[i]);
    noStroke();
    rect(x,y,w,h);
  }
}

function createPallete(_url) {
  //後ろから/の位置を数える．
  let slash_index = _url.lastIndexOf('/');
  //'/'以降の文字列を取得
  let pallate_str = _url.slice(slash_index + 1);
  //文字列を'-'で区切って配列に入れる
  let arr = pallate_str.split('-');
  //各要素の先頭に'#'を追加
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  //配列を返す
  return arr;
}
