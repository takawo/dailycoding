let tf;
let sliders = [];
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.noStroke();
  
  for (let i = 0; i < width * height * 15 / 100; i++) {
    if(random(100) > 50){
    graphics.fill(0, 0, 0, 10);
    }else{
    graphics.fill(0, 0, 100, 10);
    }
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    graphics.ellipse(x, y, w, h);
  }  	
	
	
  tf = new Transformer();

  let cells = int(random(2,8));
  let offset = width / 10;
  let margin = offset / 5;

  let cellSize = (width - offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (cellSize + margin);
      let y = offset + j * (cellSize + margin);
      tf.push();
      tf.translate(x+cellSize/2,y+cellSize/2);
      tf.rotate(int(random(4)) * 360/4);
      let slider1 = createSlider(0,100,0);
      slider1.size(sqrt(sq(cellSize)*2),20);
      slider1.position(tf.x-slider1.width/2,tf.y-slider1.height/2);
      slider1.style("transform", "rotate(" + (-45 + tf.a) + "deg)");
      let slider2 = createSlider(0,100,0);
      slider2.size(cellSize,20);
      slider2.position(tf.x-slider2.width/2+cos(tf.a) * cellSize/2,tf.y-slider2.height/2+sin(tf.a) * cellSize/2);
      slider2.style("transform", "rotate(" + (90+ tf.a) + "deg)");

      let slider3 = createSlider(0,100,0);
      slider3.size(cellSize,20);
      slider3.position(tf.x-slider2.width/2+cos(tf.a+90) * cellSize/2,tf.y-slider2.height/2+sin(tf.a+90) * cellSize/2);
      slider3.style("transform", "rotate(" + (tf.a) + "deg)");
      let d = cellSize/2;
      // fill(0,0,100);
      // triangle(d,d,d,-d,-d,d);
      sliders.push(slider1);
      sliders.push(slider2);
      sliders.push(slider3);
      tf.pop();
    }
  }
}

function draw(){
  background(0, 0, 20);
  image(graphics,0,0);
	
  for(let slider of sliders){
    slider.value((slider.value()+3)%100);
  }
}

class Transformer {
  constructor(x, y, a, s, stack) {
    this.x = x != null ? x : 0;
    this.y = y != null ? y : 0;
    this.a = a != null ? a : 0;
    this.s = s != null ? s : 1;
    this.stack = stack != null ? stack : [];
  }
  push() {
    push();
    return this.stack.push([this.x, this.y, this.a, this.s]);
  }

  pop() {
    var ref;
    pop();
    return ref = this.stack.pop(), this.x = ref[0], this.y = ref[1], this.a = ref[2], this.s = ref[3], ref;
  }

  rotate(da) {
    rotate(da);
    return this.a += da;
  }

  scale(ds) {
    scale(ds);
    return this.s *= ds;
  }

  translate(dx, dy) {
    translate(dx, dy);
    this.x += this.s * dx * cos(this.a) - this.s * dy * sin(this.a);
    return this.y += this.s * dy * cos(this.a) + this.s * dx * sin(this.a);
  }

}