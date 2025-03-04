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

const width = 50;
const height = 25;

function setup() { // runs first
    window.addEventListener("resize", resize);
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("mousemove", mouseMove);
    createCanvas(window.innerWidth, window.innerHeight);
    background('gray');

    for (let row = 0; row < height; row++) {
        tiles.append([]);
        for (let col = 0; col < width; col++) {
            tiles[row].append(new Tile(1));
        }
    }

    for (let row = 0; row < height*4; row++) {
        pixels.append([]);
        for (let col = 0; col < width*4; col++) {
            pixels[row].append(0);
        }
    }
}

function preload() { // runs before setup
    
}

function draw() { // runs every frame
    textSize(10);
    text(toString(), 0, 0);
}

function resize() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function mouseUp()
{
    lastX = -1;
    lastY = -1;
}

function mouseMove()
{
    if (mouseIsPressed) {
        strokeWeight(1);
        stroke("white");
        if (lastX != -1)
        {
            line(lastX, lastY, mouseX, mouseY);
        }
        lastX = mouseX;
        lastY = mouseY;
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

