//lyric from : http://songlyrics-kashi.seesaa.net/article/452591517.html
let count = 0;
let w;
let angle = 0;
let graphics;
let imgs = [];
let num = 20;
let rs;
let lyric = ["いつまても信じていたい","最後まで思い續けたい","自分は生きる意味があるはずと","冷めた目で笑いかけてる","魂を侵された奴","淚を流す痛みはあるのかい","言いたい事も言えないこんな世の中じゃPOISON","俺は俺をだますことなく生きてゆくOH OH","まっすぐ向きあう","現實に誇りを持つために","戰う事も必要なのさ"," ","階段にすわりこんで","終らない夢の話を","夜が明けるまで語り續けてた","さりげなく季節は變わり","無意識に視線を落とし","流される事に慣れてゆくのか","小さな夢も見れないこんな世の中じゃ  POISON","自分らしさずっといつでも好きでいたい   OH OH","自由に生きてく日を","大切にしたいから","行きたい道を今步きだす"," ","汙い噓や言葉で操られたくない　POISON","素直な氣持ちから目をそらしたくない OH OH","言いたい事も言えないこんな世の中じゃPOISON","俺は俺をだますことなく生きてゆくOH OH","まっすぐ向きあう現實に誇りを持つために戰う事も必要なのさ"];

function setup() {
  createCanvas(800,800);
  colorMode(HSB, 360, 100, 100, 100);
  pixelDensity(1);
  angleMode(DEGREES);
  w = sqrt(width * width + height * height);

  for (let i = 0; i < lyric.length; i++) {
    QRCode.toDataURL(lyric[i], {
        margin: 1,
        scale: 10,
      },
      function(err, url) {
        let img = loadImage(url);
        imgs.push(img);
      });
  }

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.noStroke();
  for (let i = 0; i < width * height * 10 / 100; i++) {
    graphics.fill(0, 0, random(100) > 50 ? 20 : 80, 5);
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    graphics.ellipse(x, y, w, h);
  }
  rs = random(10000);
}

function draw() {
  randomSeed(rs);
  push();
  translate(width / 2, height / 2);
  rotate(frameCount / 2 + 45);
  separateGrid(-w / 2 - 1, -w / 2 - 1, w + 2, w + 2, 8);
  pop();
  count += 0.05;
  image(graphics, 0, 0);
}

function separateGrid(x, y, w, h, depth) {
  let direction = random(100) > 50 ? -1 : 1;
  if (depth > 0) {
    let n = map(sin((x * y / 3333) + frameCount / 3) * cos((w * h) / 33333 + frameCount / 2), -1, 1, 0, 1);
    push();
    translate(x + w / 2, y + h / 2);
    //rotate(int(random(4)) * 360 / 4);
    imageMode(CENTER);
    image(random(imgs), 0, 0, w, h);
    pop();
    if (depth % 2 == 1) {
      separateGrid(x, y, w * n, h, depth - 1);
      separateGrid(x + w * n, y, w - w * n, h, depth - 1);
    } else {
      separateGrid(x, y, w, h * n, depth - 1);
      separateGrid(x, y + h * n, w, h - h * n, depth - 1);
    }
  }
}

function shuffleArr(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    let j = floor(random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}