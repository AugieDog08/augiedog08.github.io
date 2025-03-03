function preload() {
    logo = loadImage('/q5js_logo.webp');
  }

function setup() {
    createCanvas(200, 100);
    background('aqua');
  }

function draw() {
    background('silver');
    circle(frameCount % 200, 100, 80);
  }