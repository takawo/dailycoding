let sliders;
let noiseScale = 100;
let graphics;
let speed = 1;
function setup() {
  createCanvas(800, 800);
  
  sliderInit();
  
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
}

function draw() {
  background(20);
  for(let slider of sliders){
    let n =noise(slider.x/noiseScale,slider.y/noiseScale,frameCount/noiseScale);
    // slider.value(int(n*100));
    slider.value(frameCount*speed%100);  
  }
	if(abs((frameCount+1)*speed%100-frameCount*speed%100) != speed){
      for(let slider of sliders){
        slider.remove();
      }
		sliderInit();  
	}
  image(graphics,0,0);
}

function sliderInit(){
	sliders= [];
  let cells = int(random(3, 8));
  let offset = width / 10;
  let margin = 0;//offset / 5;

  let cellW = (width - offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (cellW + margin);
      let y = offset + j * (cellW + margin);
      let cx = x + cellW / 2;
      let cy = y + cellW / 2;

      let n = int(random(4));

      // switch (n) {
      //   case 0:
      //     triangle(cx - cellW / 2, cy - cellW / 2,
      //       cx + cellW / 2, cy - cellW / 2,
      //       cx + cellW / 2, cy + cellW / 2);
      //     break;
      //   case 1:
      //     triangle(
      //       cx + cellW / 2, cy - cellW / 2,
      //       cx + cellW / 2, cy + cellW / 2,
      //       cx - cellW / 2, cy + cellW / 2);
      //     break;
      //   case 2:
      //     triangle(cx - cellW / 2, cy - cellW / 2,
      //       cx + cellW / 2, cy + cellW / 2,
      //       cx - cellW / 2, cy + cellW / 2);
      //     break;
      //   case 3:
      //     triangle(cx - cellW / 2, cy - cellW / 2,
      //       cx + cellW / 2, cy - cellW / 2,
      //        cx - cellW / 2, cy + cellW / 2);
      //      break;
      // }


      let slider = createSlider(0, 100, 50);
      slider.size(sqrt(sq(cellW)*2), 20);
      slider.position(cx - slider.width / 2, cy - slider.height / 2);
      slider.style("transform", "rotate(" + (45 + n * 90) + "deg)");
      slider.style("background", "#ff0000");
      slider.style("background", "#ff0000");
      sliders.push(slider);
    }
  }
}