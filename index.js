class Tile {
    constructor(tile) {
        this.tile = tile;
        this.character = tileset[tile];
    }
}

let tileset = [".", ".", "_", "\'", "|", "/", "?", "\'", "\\", "|", "?", "-", "?", "?", "?"];

let lastX = -1;
let lastY = -1;
let tiles = [];
let pixels = [];

const width = 500;
const height = 250;

function setup() { // runs first
    window.addEventListener("resize", resize);
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("mousemove", mouseMove);
    createCanvas(window.innerWidth, window.innerHeight);
    background('gray');

    for (let row = 0; row < height; row++) {
        tiles.push([]);
        for (let col = 0; col < width; col++) {
            tiles[row].push(new Tile(1));
        }
    }

    for (let row = 0; row < height*4; row++) {
        pixels.push([]);
        for (let col = 0; col < width*4; col++) {
            pixels[row].push(0);
        }
    }

    textSize(16);
    textFont('monospace');
    textLeading(16);
}

function preload() { // runs before setup
    
}

function draw() { // runs every frame
    background("gray");
    strokeWeight(0);
    text(toString(), 0, 10);
    strokeWeight(1);
}

function resize() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    background("gray");
}

function mouseUp()
{
    lastX = -1;
    lastY = -1;
}

function mouseMove()
{
    if (mouseIsPressed) {
        pixels[Math.floor(mousex / 4), Math.floor(mousey / 4)];
    }
}

function toString() {
    s = "";
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            s += tiles[row][col].character;
        }
        s += "\n";
    }
    return s;
}

// 0001: .
//  next subpixel is up right: ,
// 0010: .
// 0011: _
//  if next char is down right and 1001: .
// 0100: '
//  if next subpixel is down right: `
// 0101: |
// 0110: /
//  if above char is 1010 or 0101: '
//  if right char is 1100: .
// 1000: '
// 1001: \
//  if above char is 1010 or 0101: '
//  if left char is 1100: .
// 1010: |
// 1100: -
//  if last subpixel was top left: `

//   ___          
// ,'   `.        
//        \       
//         |      
//         '.     
//          |     
//          `.    
//            `-._

// 0001
// 0110
// 0011
// 0011
// 0011
// 1100
// 0011
// 1001
// 1010
// 1001
// 0010
// 1010
// 0100
// 0010
// 1100
// 1100
// 1001
// 0011

//   ___          
// ./   -_        
//        \       
//         |      
//         \.     
//          |     
//          '.    
//            --\_

