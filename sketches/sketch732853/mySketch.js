let url = "https://coolors.co/app/1a535c-4ecdc4-f7fff7-ff6b6b-ffe66d";
let pallete;
let graphics;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB,360,100,100,100);
  pallete = createPallete(url);
  graphics = createGraphics(width,height);
  graphics.colorMode(HSB,360,100,100,100);
  drawNoiseBackground(100000,graphics);
}

function draw() {
  background(0,0,20);

  let num = pallete.length;
  let offset = width / 10;
  let margin = offset / 4;

  let cellW = (width - offset * 2 - margin * (num - 1)) / num;
  let cellH = cellW*3;

  for (let i = 0; i < num; i++) {
    
    
    let f = frameCount/100;
    
    let current = int(i + f)%pallete.length;
    let next = ceil(i + f)%pallete.length;
    let fl = f %1;

    let c1 = color(pallete[current]);
    let c2 = color(pallete[next]);
    
    colorMode(HSB);
    let c = lerpColor(c1,c2,fl);
    
    let x = map(i,0,num-1,offset,width-offset - cellW);
    let y = height/2-cellH/2;
    fill(c);
    noStroke();
    rect(x,y,cellW,cellH);

  }
  image(graphics,0,0);
}

function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}

function drawNoiseBackground(_n, _graphics) {
	let c = color(0, 0, 100, 5);
	for (let i = 0; i < _n; i++) {
		let x = random(1) * width;
		let y = random(1) * height;
		let w = random(1, 2);
		let h = random(1, 2);
		_graphics.noStroke();
		_graphics.fill(c);
		_graphics.ellipse(x, y, w, h);
	}
}