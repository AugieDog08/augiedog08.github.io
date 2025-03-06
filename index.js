//   ___
// ,'   `.
//        \
//         |
//         '.
//          |
//          `.
//            `-._

// 1. let the user draw
// 2. split the drawing into a grid of cells
// 3. for each cell with a drawing in it, find the best fit character combination
//      use the entrance pixel (first pixel in x direction) and the exit pixel (last pixel in x direction)
//      to calculate a line between the two points (use distance formula on leftmost and rightmost points, average the two, and find the closest)
// update the display with the new grid every frame

const leftmostx = [3, 3, 3, 3, 7, 4, 4, 4, 4, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 7, 7, 5, 5, 5, 5, 18, 18, 22, 19, 15, 21, 21, 22, 20]
const leftmosty = [7, 24, 24, 24, 25, 13, 13, 13, 13, 4, 4, 4, 4, 4, 4, 4, 7, 9, 9, 24, 24, 25, 25, 25, 25, 7, 24, 25, 13, 4, 4, 7, 24, 25]
const rightmostx = [11, 29, 23, 11, 7, 25, 23, 22, 10, 26, 29, 23, 14, 25, 22, 8, 26, 29, 8, 23, 7, 26, 25, 23, 9, 26, 26, 22, 25, 29, 23, 23, 22, 24]
const rightmosty = [24, 4, 7, 7, 1, 13, 7, 24, 13, 24, 4, 9, 4, 13, 24, 9, 24, 4, 7, 7, 19, 7, 13, 7, 22, 24, 7, 1, 13, 4, 9, 9, 18, 22]

const characters = [
  "/ ",
  "\\_",
  "\\.",
  "\\ ",
  "| ",
  "--",
  "-.",
  "-'",
  "- ",
  "_/",
  "__",
  "_,",
  "_ ",
  ",-",
  ",'",
  ", ",
  "./",
  "._",
  ". ",
  "'.",
  "' ",
  "`\\",
  "`-",
  "`.",
  "` ",
  " /",
  " \\",
  " |",
  " -",
  " _",
  " ,",
  " .",
  " '",
  " `",
];
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let mouseIsDown = false;

window.addEventListener("mousemove", mouseMove);
window.addEventListener("mousedown", mouseDown);
window.addEventListener("mouseup", mouseUp);
window.addEventListener("keydown", keyDown);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function mouseMove(e) {
  if (mouseIsDown) {
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  }
}

function mouseDown(e) {
  if (e.button === 0) {
    mouseIsDown = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }
}

function mouseUp(e) {
  if (e.button === 0) {
    mouseIsDown = false;
    ctx.closePath();
    ctx.beginPath();
  }
}

function keyDown(e) {
  if (e.key === "r") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function getBestFitCharacter(x1, y1, x2, y2) {
    let lowestd = 9999999;
    let index = -1;
    let d1;
    let d2;
    let d;
    for (let i = 0; i < leftmostx.length; i++) {
        d1 = Math.sqrt((x1 - (leftmostx[i])/30) ** 2 + (y1 - (leftmosty[i])/33) ** 2);
        d2 = Math.sqrt((x2 - (rightmostx[i])/30) ** 2 + (y2 - (rightmosty[i])/33) ** 2);
        d = (d1 + d2) / 2;
        if (d < lowestd) {
            lowestd = d;
            index = i;
        }
        console.log(characters[i], d);
    }
    return characters[index];
}
