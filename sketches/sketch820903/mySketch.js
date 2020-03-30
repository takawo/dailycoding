//塗と線を変更しただけですが，印象変わります
function setup() {
  createCanvas(700, 700);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  background(20);
  for (let i = 0; i < 8000; i = i + 1) {
    let x = random(width);
    let y = random(height);
    stroke(0, 0, 100, 20);
    point(x, y);
  }

  for (i = 0; i < 15; i = i + 1) {
    let x = width / 2;
    let y = height / 2;
    let s1 = random(80, 300);
    let s2 = s1 + random(5, 80);
    let s3 = s2 + random(5, 90);
    let h = random(0, 60);

    let rotate_num = int(random(4)) * 360 / 4;

    push();
    translate(x, y);
		scale(i/10,i/10);
    rotate(rotate_num);
		noFill();
    stroke(h, 20, 80, 80);
    arc(0, 0, s3, s3, 60, random(100, 300));
    stroke(h + 3, 50, 70, 60);
    arc(0, 0, s2, s2, 60, 300);
    stroke(h + 5, 70, 90, 50);
    arc(0, 0, s1, s1, 60, 300);
    pop();
  }
}