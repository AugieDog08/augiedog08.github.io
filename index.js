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