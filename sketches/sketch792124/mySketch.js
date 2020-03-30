let bg;
let letters = "ある日の事でございます。御釈迦様は極楽の蓮池のふちを、独りでぶらぶら御歩きになっていらっしゃいました。池の中に咲いている蓮の花は、みんな玉のようにまっ白で、そのまん中にある金色の蕊からは、何とも云えない好い匂が、絶間なくあたりへ溢れて居ります。極楽は丁度朝なのでございましょう。やがて御釈迦様はその池のふちに御佇みになって、水の面を蔽っている蓮の葉の間から、ふと下の容子を御覧になりました。この極楽の蓮池の下は、丁度｜地獄の底に当って居りますから、水晶のような水を透き徹して、三途の河や針の山の景色が、丁度｜覗き眼鏡を見るように、はっきりと見えるのでございます。するとその地獄の底に、犍陀多と云う男が一人、ほかの罪人と一しょに蠢いている姿が、御眼に止まりました。この犍陀多と云う男は、人を殺したり家に火をつけたり、いろいろ悪事を働いた大泥坊でございますが、それでもたった一つ、善い事を致した覚えがございます。と申しますのは、ある時この男が深い林の中を通りますと、小さな蜘蛛が一匹、路ばたを這って行くのが見えました。そこで犍陀多は早速足を挙げて、踏み殺そうと致しましたが、「いや、いや、これも小さいながら、命のあるものに違いない。その命を無暗にとると云う事は、いくら何でも可哀そうだ。」と、こう急に思い返して、とうとうその蜘蛛を殺さずに助けてやったからでございます。御釈迦様は地獄の容子を御覧になりながら、この犍陀多には蜘蛛を助けた事があるのを御思い出しになりました。そうしてそれだけの善い事をした報には、出来るなら、この男を地獄から救い出してやろうと御考えになりました。幸い、側を見ますと、翡翠のような色をした蓮の葉の上に、極楽の蜘蛛が一匹、美しい銀色の糸をかけて居ります。御釈迦様はその蜘蛛の糸をそっと御手に御取りになって、玉のような白蓮の間から、遥か下にある地獄の底へ、まっすぐにそれを御下しなさいました。";
let depthMax = 4;

let counter = 0;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  bg.fill(0, 0, 100, 5);
  for (let i = 0; i < width * height * 20 / 100; i++) {
    let radius = sqrt(sq(width / 2) + sq(height / 2));
    let angle = random(360);
    let r = 1 - (random(random(random(1))));
    let x = width / 2 + r * radius * cos(angle);
    let y = height / 2 + r * radius * sin(angle);
    let w = random(3);
    let h = random(3);
    bg.noStroke();
    bg.ellipse(x, y, w, h);
  }
}

function draw() {
  background(0, 0, 15);
  image(bg, 0, 0);
  separateGrid(0, 0, width);
  noLoop();
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 15) {
        separateGrid(i, j, w);
      } else {
        let cx = i + w / 2;
        let cy = j + w / 2;
        push();
        translate(cx, cy);
        let l = w / 3;
        let depth = int(random(1, depthMax));
        tree(depth, l);
        pop();

        //rect(i, j, w, w);
        push();
        translate(cx,cy + w * 0.1);
        textSize(w);
        textAlign(CENTER,CENTER);
        fill(0,0,100);
        text(letters[counter],0,0);
        pop();

        counter++;
        if (counter > letters.length - 1) {
          counter = 0;
        }
      }
    }
  }
}

function tree(depth, l) {
  let len = 150;
  if (depth > 0) {
    let n = int(random(3, 10));
    for (let angle = 0; angle < 360; angle += 360 / n) {
      push();
      rotate(angle);
      stroke(0, 0, 100, 100);
      noFill();
      let sw = map(l, 0, len, 0, depthMax);
      strokeWeight(sw);
      if (random(100) > 50) {
        bezier(0, 0, l / 2, l / 2, l / 2, -l / 2, l, 0);
      } else {
        bezier(0, 0, l / 2, -l / 2, l / 2, l / 2, l, 0);
      }
      translate(l, 0);
      rotate(random(360));
      tree(depth - 1, l * random(0.2, 0.7));
      pop();
    }
  }
}