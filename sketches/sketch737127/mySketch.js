let myMap;
let canvas;
let canvas2;

let graphics;

let mappa;
const options = {
	lat: 34.73509286926,
	lng: 135.28725896797,
	zoom: 10,
	style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function preload() {
	mappa = new Mappa('Leaflet');
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	graphics = createGraphics(width, height);
	myMap = mappa.tileMap(options);
	myMap.overlay(canvas)
}

function draw() {
	clear();
	const kwu = myMap.latLngToPixel(34.73509286926, 135.28725896797);
	noStroke();
	fill(200, 100, 100);
	ellipse(kwu.x, kwu.y, 50, 50);
}