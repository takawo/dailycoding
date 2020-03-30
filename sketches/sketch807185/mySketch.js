function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(0, 0, 95);
  separateGrid(0, 0, width);
  frameRate(1);
  noLoop();
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 8) {
        separateGrid(i, j, w);
      } else {
        let checkBox = createCheckbox();
        checkBox.style("margin", "0px");
        checkBox.style("vertical-align", "middle");
        checkBox.style("text-align", "center");
        if (random(100) > 50) {
          checkBox.checked(true);

        } else {
          checkBox.checked(false);
        }
        let s = w / 17.75;
       checkBox.position(i+w/4, j+w/4);
         checkBox.style("transform","scale(" + w/17.75 + ")");
        // rect(i, j, w, w);
      }
    }
  }
}