let url = "https://coolors.co/app/1a535c-4ecdc4-f7fff7-ff6b6b-ffe66d";
let pallete;
let rs;
let bg;

function setup(){
	createCanvas(windowWidth,windowHeight);
	colorMode(HSB,360,100,100,100);
	angleMode(DEGREES);
	background(0,0,0);
	rs = int(random(10000));
	pallete = createPallete(url);
	let n = int(random(pallete.length));
	bg = pallete[n];
	pallete.splice(n,1);
}

function draw(){
	background(bg);
	
	randomSeed(rs);
	
	let rMax = width;
	for(let r = rMax; r > 0; r -= rMax/100){

	let n = int(random(3,10));
	push();
	translate(width/2,height/2);
	rotate(random(360)+frameCount/4*(random(100)>50 ? -1:1));
	scale(tan((r*5+frameCount/4)%90)); 
	for(let angle = 0; angle < 360; angle += 360 / n){
		let x = cos(angle) * r;
		let y = sin(angle) * r;
		push();
		translate(x,y)
		rectMode(CENTER);
		rotate(x+y);
		noStroke();
		fill(pallete[int(random(pallete.length))]);
		if(random(100) < 50){
			drawTriangle(0,0,r/10);
		}else{
				
			if(random(100) < 50){
				let m = int(random(4));
				
				switch(m){
					case 0:
						rect(0,0,r/10,r/10,r,0,0,0);
						break;
					case 1:
						rect(0,0,r/10,r/10,0,r,0,0);
						break;
					case 2:
						rect(0,0,r/10,r/10,0,0,r,0);
						break;
					case 3:
						rect(0,0,r/10,r/10,0,0,0,r);
						break;
					
				}
			}else{
				ellipse(0,0,r/10,r/10);
			}
		}
		pop();
	}
	pop();
	}
}

function drawTriangle(x,y,r){
	push();
	translate(x,y);
	rotate(random(360));
	beginShape();
	for(let angle = 0; angle < 360; angle += 360/3){
		let x2 = cos(angle) * r/2;
		let y2 = sin(angle) * r/2;
		vertex(x2,y2);
	}
	endShape();
	pop();
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