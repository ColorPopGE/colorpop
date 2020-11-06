let life = 3;
let colors = ["lightgreen", "blue", "yellow", "red"];
let playerColor;
let isStarted = false;
let pause = false;
let reset = false;
let img;
let lifeImg3;
let lifeImg2;
let lifeImg1;
let lifeImg0;



const level = shuffle(colors);

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function live() {
  if (life < 1) {
    let alive = false;
  }
  if (alive == false) {
    alert("TOD");
  }
}

var gif_loadImg, gif_createImg;

function preload() {
  img = loadImage("images/colorcoins.png");
  lifeImg3= loadImage("images/Leben3.png")
  lifeImg2= loadImage("images/Leben2.png")
  lifeImg1= loadImage("images/Leben1.png")
  lifeImg0= loadImage("images/Leben0.png")
}

var url = "http://colormind.io/api/";
var data = {
  model: "default",
  input: [
    [
      Math.floor(Math.random() * 99),
      Math.floor(Math.random() * 99),
      Math.floor(Math.random() * 99),
    ],
    "N",
    "N",
    "N",
  ],
};

function fetchColors() {
  console.log("fetchColors called")
  var http = new XMLHttpRequest();

  http.open("POST", url, true);
  http.send(JSON.stringify(data));
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      let palette = JSON.parse(http.responseText).result;
      let colorsApi = [
        rgbToHex(palette[0][0], palette[0][1], palette[0][2]),
        rgbToHex(palette[1][0], palette[1][1], palette[1][2]),
        rgbToHex(palette[2][0], palette[2][1], palette[2][2]),
        rgbToHex(palette[3][0], palette[3][1], palette[3][2]),
      ];
      colors = colorsApi
      
    }
  };
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function randomPlayerColor() {
  await sleep(250);
  let newPlColor_arr = colors.filter((color) => color != playerColor);
  playerColor = newPlColor_arr[Math.floor(Math.random() * newPlColor_arr.length)];
  wall = shuffle(colors);
  console.log("Player color is: " + playerColor);
}

function setup() {
  document.getElementById("startGame");
  var c = createCanvas(400, 600);
  randomPlayerColor();
}

function keyPressed(key_Code) {
  if (keyCode == key_Code) {
    return true;
  }
}

function createt(
  textpayload = "Test",
  xPos = 50,
  yPos = 50,
  size = 16,
  colortxt = "black"
) {
  this.x = xPos;
  this.y = yPos;
  this.col = colortxt;
  this.size = size;
  this.txt = textpayload;

  this.display = function (textpayload2 = this.txt) {
    fill(this.col);
    textAlign(CENTER);
    textSize(this.size);
    text(textpayload2, this.x, this.y);
  };
}

function createc(xPos = 50, yPos = 50, size = 10, colorcirc = "black") {
  this.x = xPos;
  this.y = yPos;
  this.r = size / 2;
  this.col = colorcirc
  this.display = function () {
    fill(this.col);
    circle(this.x, this.y, this.r * 2);
  };

  this.explode = function () {
    for (i = 0; i < 30; i++) {
      fill("orange");
      circle(this.x, this.y, this.r * 3);
      this.r = 0;
  console.log(wall[0])
}
  };
}
 function resete(){
  reset=true;
  console.log("reset")
  life=3
  score=0
  //farben müssen noch resetet werden 
}
async function dead(){
    if (life < 1) {
      image(lifeImg0, 30, 10, 40, 40)
      await sleep(50);
      alert("Du bist Tod!");
      //life=3;
      

  }
}
function mouseMoved() {
  if (mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0) {
    mscirc = new createc(mouseX, 450, 40, playerColor);
    mscirc.display();
  }
}

let wall = shuffle(colors);
function drawWall(number, y) {
  circ1 = new createc(50, y, 50, wall[0]);
  circ1.display();
  circ2 = new createc(150, y, 50, wall[1]);
  circ2.display();
  circ3 = new createc(250, y, 50, wall[2]);
  circ3.display();
  circ4 = new createc(350, y, 50, wall[3]);
  circ4.display();
}

let i = 0;
let hit = false;
let point = false;
let score = 0;
let alreadyCounted = false;
let alreadyCountedhit = false;

let gameRunning = true;

score_text = new createt("Score: 0", 200, 40);

let colorchange = false;

let speed = 4
function draw() {
  // if(!isStarted){
  //   let textstart = new createt("Press space to start", 200, 175 ,32)
  //   textstart.display("Press space to start")
  //   if (keyPressed(32)){
  //     console.log("Let´s get it started! Hah")
  //     isStarted = true
  //   }else {
  //     return
  //   }
  // }
  // resetButton();
  // while(gameRunning == true){
  point = false;
  hit = false;
  
  i = i + speed;
  let wallNumber = Math.floor(i / 500);
  if (wallNumber == level.length - 1) {
    i = 1;
    wall = shuffle(colors);
  }
  background(220);
  image(img, 125, 12, 55, 50);
  if(life==3){image(lifeImg3, 30, 10, 40, 40);}
  if(life==2){image(lifeImg2, 30, 10, 40, 40);}
  if(life==1){image(lifeImg1, 30, 10, 40, 40);}
  
  
  score_text.display(score);
  drawWall(wallNumber, (i % 500) + 50);
  mouseMoved();
  if (dist(mscirc.x, mscirc.y, circ1.x, circ1.y) < mscirc.r + circ1.r) {
    if (mscirc.col == circ1.col) {
      point = true;
    } else {
      hit = true;
    }
  } else if (dist(mscirc.x, mscirc.y, circ2.x, circ2.y) < mscirc.r + circ2.r) {
    if (mscirc.col == circ2.col) {
      point = true;
    } else {
      hit = true;
    }
  } else if (dist(mscirc.x, mscirc.y, circ3.x, circ3.y) < mscirc.r + circ3.r) {
    if (mscirc.col == circ3.col) {
      point = true;
    } else {
      hit = true;
    }
  } else if (dist(mscirc.x, mscirc.y, circ4.x, circ4.y) < mscirc.r + circ4.r) {
    if (mscirc.col == circ4.col) {
      point = true;
    } else {
      hit = true;
    }
  }

  if (point == true) {
    if (!alreadyCounted) {
      score++;
      if (score % 15 === 0) {
        fetchColors()
      }
      console.log("Score: " + score);
      score_text.display("Score: " + score);
      alreadyCounted = true;
      randomPlayerColor();
      circ1.explode();
      speed += 0.02
    }
  } else {
    alreadyCounted = false;
  }
  if (hit == true) {
    if (!alreadyCountedhit) {
      life--;
      console.log("Lives: " + life );
      alreadyCountedhit = true;
      randomPlayerColor();
      circ1.explode();
      speed += 0.02
          }
  } else {
    alreadyCountedhit = false;
  }
  dead();
  

    
  
}
