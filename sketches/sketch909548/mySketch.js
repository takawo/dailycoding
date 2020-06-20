let gol;
let pallete = ["#568777", "#B6BDB0", "#4C594B", "#FB9E27", "#2B9192", "#DC3509", "#0C120E", "#EEEEEE"];

function setup() {
  createCanvas(1280, 720);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  let constraints = {
    video: {
      mandatory: {
        minWidth: 1280,
        minHeight: 720
      },
      optional: [{
        maxFrameRate: 30
      }]
    },
    audio: false
  };
  capture = createCapture(constraints, function() {
    capture.hide();
    let img = capture.get();
    gol = new GameOfLife(img);
  });
}

function draw() {
  let img = capture.get();
  image(img, 0, 0);
  //filter(THRESHOLD);

  if (gol != undefined) {
    gol.generate();
    gol.display();
    if (frameCount % 200 == 0) {

      gol.init(img);
    }
  }
}

class GameOfLife {
  constructor(img) {
    this.w = int(width / 30);
    this.columns = int(width / this.w);
    this.rows = int(height / this.w);
    this.cells = new Array(this.rows);
    this.ns = 100;
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i] = new Array(this.columns);
    }
    this.init(img);
  }
  init(img) {
    for (let j = 0; j < this.rows; j++) {
      for (let i = 0; i < this.columns; i++) {
        let x = this.w * i + this.w / 2;
        let y = this.w * j + this.w / 2;
        let c = img.get(x, y);
        if (red(c) > 0) {
          this.cells[j][i] = 0;
        } else {
          this.cells[j][i] = 1;
        }
        // this.cells[j][i] = int(random(2));
      }
    }
  }

  generate() {
    var next = new Array(this.rows);
    for (var i = 0; i < this.rows; i++) {
      next[i] = new Array(this.columns);
    }

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        let neighbors = 0;

        for (let j = -1; j <= 1; j++) {
          for (let i = -1; i <= 1; i++) {
            neighbors += this.cells[(y + j + this.rows) % this.rows][(x + i + this.columns) % this.columns];
          }
        }

        neighbors -= this.cells[y][x];

        if ((this.cells[y][x] == 1) && (neighbors < 2)) next[y][x] = 0; // Loneliness
        else if ((this.cells[y][x] == 1) && (neighbors > 3)) next[y][x] = 0; // Overpopulation
        else if ((this.cells[y][x] === 0) && (neighbors == 3)) next[y][x] = 1; // Reproduction
        else next[y][x] = this.cells[y][x]; // Stasis
      }
    }
    this.cells = next;
  }
  display() {
    for (let j = 0; j < this.rows; j++) {
      for (let i = 0; i < this.columns; i++) {
        if (this.cells[j][i] == 1) {
          let m = i + this.columns * j;
          fill(pallete[m % pallete.length]);
        } else {
          // fill(25);
          noFill();
        }
        noStroke();
        let x = i * this.w + this.w / 2;
        let y = j * this.w + this.w / 2;
        let n = noise(x / (this.ns), y / (this.ns), frameCount / (this.ns*4));

        n = int(n * 4);
        push();
        translate(x, y);
        rotate((n+int(frameCount/10)) * 360 / 4);
        arc(-this.w / 2, -this.w / 2, this.w * 2, this.w * 2, 0, 90);
        pop();
        // rect(i * this.w, j * this.w, this.w, this.w);
      }
    }
  }
}