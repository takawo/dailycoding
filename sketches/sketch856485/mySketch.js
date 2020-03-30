//reference: sentoki's awesome python sketch.
//https://twitter.com/sentoki/status/1237599357601341440;

const key = 'pk.eyJ1IjoidGFrYXdvIiwiYSI6ImNrN214NWFseDA0dmEzZWs0M3J5OTE4YXkifQ.AMZSk97tsNyi-sroSl21mQ';
let csv_url = "https://raw.githubusercontent.com/kaz-ogiwara/covid19/master/data/individuals.csv";
let table_covid;
let table_latlng;
let options = {
  lng: 135.15,
  lat: 35.5,
  zoom: 4.3,
  // style: 'mapbox://styles/mapbox/navigation-guidance-night-v4',
  style: 'mapbox://styles/mapbox/traffic-day-v2',
  pitch: 30,
};
const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;

function preload() {
  table_latlng = loadTable("location.csv", 'csv', 'header', function() {
    // print(table_latlng);
  });
  table_covid = loadTable(csv_url, 'csv', 'header', function() {});
}

function setup() {
  canvas = createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);

  if (!navigator.geolocation) {
    alert("navigator.geolocation is not available");
  }
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
  });
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  for (let data of table_covid.rows) {
    for (let location of table_latlng.rows) {
      if (data.arr[7] == location.arr[1]) {
        if (location.arr.length == 5) {
          location.arr.push(1);
        } else {
          location.arr[5]++;
        }
      }
    }
  }
}

function draw() {
  clear();
  blendMode(ADD);

  for (let data of table_latlng.rows) {
    let lat = data.arr[3];
    let lng = data.arr[4];
    let count = data.arr[5];
    if (count != undefined) {
      let location = myMap.latLngToPixel(lat, lng);
      fill(330, 80, 100, 50);
      noStroke();
      let d = map(count, 0, 120, 0, 20) * myMap.getZoom();
      drawingContext.shadowBlur = d;
      drawingContext.shadowColor = color(0, 0, 0, 30);
      ellipse(location.x, location.y, d, d);
    }
  }
}