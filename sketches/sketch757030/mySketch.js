let emojiArr;
let canvas;
let palette;
let c;
let src;
let img;

function draw() {
  canvas = createCanvas(800, 800);
  emojiArr = createEmojiArr();
  let str = random(emojiArr);
  textSize(600);
  textAlign(CENTER, CENTER);
  text(str, width / 2, height / 2);
  var sourceImage = canvas.canvas.toDataURL();
  if (typeof img !== 'undefined') {
    img.remove();
  }
  img = createImg(sourceImage, function() {
    img.id("image");
    let img2 = document.getElementById("image");
    let colorThief = new ColorThief();
    c = colorThief.getColor(img2);
    palette = colorThief.getPalette(img2);
    for (let i = 0; i < palette.length; i++) {
      let w = int(width / palette.length);
      let h = int(height / 6);
      let x = map(i, 0, palette.length - 1, 0, width - w);
      let y = height - h - 10;
      stroke(palette[i]);
      fill(palette[i]);
      rect(x, y, w, h);
    }
    let hexArr = [];
    for (let c of palette) {
      hexArr.push("#"+hex(c[0],2)+hex(c[1],2)+hex(c[2],2));
    }
    print(str,hexArr);
  });

	img.hide();
  //noLoop();

  frameRate(1);
}

function createEmojiArr() {
  let arr = [];
  let emoji;
  for (let i = 128512; i < 128592; i++) {
    emoji = String.fromCodePoint(i);
    arr.push(emoji);
  }
  for (let i = 127744; i < 128318; i++) {
    emoji = String.fromCodePoint(i);
    arr.push(emoji);
  }
  return arr;
}