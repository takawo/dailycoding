let gol;
let pallete = ["#DE252A", "#160213", "#D1BD98", "#4F3C43", "#53847E", "#C89E59", "#F5ECAC", "#895424"];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  pallete = arrShuffle(pallete);
  angleMode(DEGREES);
  gol = new GOL();
  frameRate(30);
}

function draw() {
  gol.generate();
  gol.display();
  if (frameCount % 50 == 0) {
    pallete = arrShuffle(pallete);
  }
}

// reset board when mouse is pressed
function mousePressed() {
  gol.init();
}

function arrShuffle(_arr) {
  let arr = _arr.concat(); // palleteのコピー
  for (var i = arr.length - 1; i > 0; i--) {
    var m = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[m];
    arr[m] = tmp;
  }
  return arr;
}


class GOL {
  constructor() {
    this.w = 30;
    this.columns = ceil(width / this.w);
    this.rows = ceil(height / this.w);

    this.board = [];
    for (var i = 0; i < this.columns; i++) {
      this.board[i] = [];
    }
    this.init();
  }
  init() {
    for (var i = 0; i < this.columns; i++) {
      for (var j = 0; j < this.rows; j++) {
        this.board[i][j] = new Cell(i * this.w, j * this.w, this.w);
      }
    }
  }
  generate() {
    for (var i = 0; i < this.columns; i++) {
      for (var j = 0; j < this.rows; j++) {
        this.board[i][j].savePrevious();
      }
    }

    for (var x = 0; x < this.columns; x++) {
      for (var y = 0; y < this.rows; y++) {
        var neighbors = 0;
        for (var i = -1; i <= 1; i++) {
          for (var j = -1; j <= 1; j++) {
            neighbors += this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous;
          }
        }

        neighbors -= this.board[x][y].previous;

        if ((this.board[x][y].state == 1) && (neighbors < 2)) this.board[x][y].newState(0);
        else if ((this.board[x][y].state == 1) && (neighbors > 3)) this.board[x][y].newState(0);
        else if ((this.board[x][y].state === 0) && (neighbors == 3)) this.board[x][y].newState(1);
      }
    }
  }

  display() {
    for (var i = 0; i < this.columns; i++) {
      for (var j = 0; j < this.rows; j++) {
        this.board[i][j].display();
      }
    }
  }
}

class Cell {
  constructor(_x, _y, _w) {
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.state = int(random(2));
    this.previous = this.state;
    this.angle = int(random(4)) * 360 / 4;
  }
  savePrevious() {
    this.previous = this.state;
  }
  newState(s) {
    this.state = s;
  }
  display() {
    noStroke();
    if (this.previous === 0 && this.state == 1) {
      fill(pallete[0]);
      rectMode(CENTER);
      rect(this.x, this.y, this.w, this.w);
    } else if (this.state == 1) {
      fill(pallete[1]);
      ellipse(this.x, this.y, this.w, this.w);
    } else if (this.previous == 1 && this.state === 0) {
      fill(pallete[2]);
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      triangle(-this.w / 2, -this.w / 2,
        +this.w / 2, -this.w / 2,
        -this.w / 2, +this.w / 2);
      pop();
    } else {
      // fill(pallete[3]);
      // rectMode(CENTER);
      // rect(this.x, this.y, this.w, this.w);
    }
  }
}