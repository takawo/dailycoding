const hiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ。っ"
const codes = "日本国民は、正当に選挙された国会における代表者を通じて行動し、われらとわれらの子孫のために、諸国民との協和による成果と、わが国全土にわたつて自由のもたらす恵沢を確保し、政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。そもそも国政は、国民の厳粛な信託によるものであつて、その権威は国民に由来し、その権力は国民の代表者がこれを行使し、その福利は国民がこれを享受する。これは人類普遍の原理であり、この憲法は、かかる原理に基くものである。われらは、これに反する一切の憲法、法令及び詔勅を排除する。日本国民は、恒久の平和を念願し、人間相互の関係を支配する崇高な理想を深く自覚するのであつて、平和を愛する諸国民の公正と信義に信頼して、われらの安全と生存を保持しようと決意した。われらは、平和を維持し、専制と隷従、圧迫と偏狭を地上から永遠に除去しようと努めてゐる国際社会において、名誉ある地位を占めたいと思ふ。われらは、全世界の国民が、ひとしく恐怖と欠乏から免かれ、平和のうちに生存する権利を有することを確認する。われらは、いづれの国家も、自国のことのみに専念して他国を無視してはならないのであつて、政治道徳の法則は、普遍的なものであり、この法則に従ふことは、自国の主権を維持し、他国と対等関係に立たうとする各国の責務であると信ずる。日本国民は、国家の名誉にかけ、全力をあげてこの崇高な理想と目的を達成することを誓ふ。";

let counter = 0;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  bg = createGraphics(width, height);
  bg.colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < width * height * 20 / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    if (random(100) > 50) {
      bg.fill(0, 0, 0, 15);

    } else {
      bg.fill(0, 0, 100, 15);

    }
    bg.noStroke();
    bg.ellipse(x, y, w, h);
  }
}

function draw() {
  background(0, 0, 95);
  separateGrid(0, 0, width);
  frameRate(1);
  noLoop();
  image(bg, 0, 0);
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 15) {
        separateGrid(i, j, w);
      } else {
        //rect(i, j, w, w);
        push();
        translate(i + w / 2, j + w / 2);
        textSize(w);
        textAlign(CENTER, CENTER);
        let isHiragana = false;
        for (let k = 0; k < hiragana.length; k++) {
          if (codes[counter] == hiragana[k]) {
            isHiragana = true;
          }
        }
        if (!isHiragana) {
          fill(0, 0, 0);
          rectMode(CENTER);
          rect(0, 0, w*0.95, w*0.95);
          //text(letters[counter],0,0);
        } else {
          text(codes[counter], 0, w * 0.1);
        }
        pop();
        counter++;
        if (counter > codes.length - 1) {
          counter = 0;
        }
      }
    }
  }
}