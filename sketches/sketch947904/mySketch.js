let images, g;
let model;
let previous_pen = 'down';
let current, p1, p2;
let strokePath;
let arr=["cat","bird","bicycle","octopus","face","flamingo","cruise_ship","truck","pineapple","spider","mosquito","angel","butterfly","pig","garden","the_mona_lisa","crab","windmill","yoga","hedgehog","castle","catbus","ant","basket","chair","bridge","diving_board","firetruck","flower","owl","palm_tree","pig","rain","skull","duck","snowflake","speedboat","sheep","scorpion","sea_turtle","pool","paintbrush","catpig","bee","antyoga","beeflower","backpack","ambulance","barn","bus","cactus","calendar","couch","elephantpig","floweryoga","hand","helicopter","lighthouse","lion","parrot","passport","peas","postcard","power_outlet","radio","snail","stove","strawberry","swan","swing_set","tiger","toothpaste","toothbrush","trombone","yogabicycle","whale","tractor","radioface","squirrel","pigsheep","lionsheep","alarm_clock","bear","book","brain","bulldozer","crabchair","crabrabbitfacepig","dog","dogbunny","dolphin","elephant","eye","fan","fire_hydrant","frog","frogsofa","hedgeberry","kangaroo","key","lantern","lobster","map","mermaid","monapassport","monkey","penguin","rabbit","rabbitturtle","rhinoceros","rifle","roller_coaster","sandwich","steak"];
let obj_str;

p5.disableFriendlyErrors = false;

function preload() {
	obj_str = random(arr);
	model = ml5.sketchRNN(obj_str, modelReady);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	init();
}

function init() {
	images = [];
	g;
}


function modelReady() {
	startDrawing();
}

// Reset the drawing
function startDrawing() {
	clear();
	current = createVector(width / 2, height / 2);
	p1 = createVector(width, height);
	p2 = createVector(0, 0);

	model.reset();
	model.generate(gotStroke);
}

function draw() {

	if (images.length < 15) {
		if (strokePath) {
			if (previous_pen == 'down') {
				stroke(0, 0, 0);
				strokeWeight(3);
				line(current.x, current.y, current.x + strokePath.dx, current.y + strokePath.dy);
			}
			current.x += strokePath.dx;
			current.y += strokePath.dy;
			p1.x = min(p1.x, current.x);
			p1.y = min(p1.y, current.y);
			p2.x = max(p2.x, current.x);
			p2.y = max(p2.y, current.y);
			previous_pen = strokePath.pen;
			if (strokePath.pen === 'end') {
				let offset = 5;
				let img = get(p1.x - offset, p1.y - offset, p2.x - p1.x + offset * 2, p2.y - p1.y + offset * 2);
				images.push(img);
				startDrawing();
			} else {
				strokePath = null;
				model.generate(gotStroke);
			}
		}
	} else {
		background(0, 0, 100);
		push();
		translate(width / 2, height / 2);
		let w = sqrt(width * width + height * height);
		translate(-w / 2, -w / 2);
		separateGrid(0, 0, w);
		pop();
		frameRate(0.5);
	}
}

function gotStroke(err, s) {
	strokePath = s;
}

function separateGrid(x, y, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 90 && d > width / 5) {
				separateGrid(i, j, w);
			} else {
				let img = random(images);
				push();
				translate(i + w / 2, j + w / 2);
				imageMode(CENTER);
				let iw, ih;
				if (img.width > img.height) {
					iw = w;
					ih = w * img.height / img.width;
				} else {
					ih = w;
					iw = w * img.width / img.height;
				}
				image(img, 0, 0, iw, ih);
				pop();
			}
		}
	}
}