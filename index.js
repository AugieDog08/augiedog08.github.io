class Element {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Draw extends Element {
    constructor(x, y) {
        super(x, y);
    }
}

let lastX = -1;
let lastY = -1;
let characters = [];

function setup() { // runs first
    window.addEventListener("resize", resize);
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("mousemove", mouseMove)
    createCanvas(window.innerWidth, window.innerHeight);
    background('aqua');

    let temp;
    for (let row = 0; row < 100; row++) {
        temp = [];
        for (let col = 0; col < 50; col++) {
            temp += "H";
        }
        characters += temp;
    }
}

function preload() { // runs before setup
    
}

function draw() { // runs every frame
    textSize(10);
    text(toString());
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
    for (let i = 0; i < characters.length; i++) {
        s += characters[i].join();
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

