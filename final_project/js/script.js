let arcadeMachine;
let canvas;
let asteroid;
let cam;
let img;
let invader;
let home;
let controller;

function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function preload(){
  asteroid = loadImage('assets/asteroid.png');
  invader = loadImage('assets/space_inv.png');
  home = loadImage('assets/home.png');
  controller = loadImage('assets/controller.png');
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  arcadeMachine = new ArcadeMachine(windowWidth / 2, windowHeight / 2);
  cam = createCapture(VIDEO);
  cam.hide();
  img = createImage(180,170);
}

function draw() {
  background("#72d0dc");
  //background(0);
  arcadeMachine.display();
  image(asteroid,windowWidth/2-35,windowHeight/2+150,30,30);
  image(invader,windowWidth/2+5,windowHeight/2+145,50,40);
  image(home,windowWidth/2+73,windowHeight/2+152,35,27);
  image(controller,windowWidth/2-100,windowHeight/2+145,40,40);

  cam.loadPixels();
  img.loadPixels();

  for(let y = 0;y<img.height;y++){
    for(let x = 0; x<img.width;x++){
      let idx = (x + y * img.width)*4;
      img.pixels[idx] = cam.pixels[idx];
      img.pixels[idx+1] = int(random(0,255));// cam.pixels[idx+1];
    //img.pixels[idx+1] = int(cam.pixels[idx+1]/(x/100));

      img.pixels[idx+2] = cam.pixels[idx+2];
      img.pixels[idx+3] = cam.pixels[idx+3];

    }
  }
// inside for-loops, manipulate the pixels
// of img based on the pixels of cam.

  img.updatePixels();
  image(img, windowWidth/2-85, windowHeight/2-115);
}

class ArcadeMachine {
  constructor(startx, starty) {
    this.x = startx;
    this.y = starty;
  }
  display() {
    //stroke(2);
    noStroke();
    //bottom rectangle
    fill("#dcddf0");
    rect(this.x - 155, this.y + 190, 320, 100);
    fill("#6c2a8c");
    rect(this.x - 145, this.y + 190, 300, 100);
    //second rectangle from bottom
    fill("#615f64");
    rect(this.x - 140, this.y + 90, 295, 100);

    fill("#fefefe");
    stroke("#fefefe");
    strokeWeight(2);
    line(this.x - 140, this.y + 90, this.x - 145, this.y + 189);
    noStroke();
    //left side main screen tilt
    triangle(
      this.x - 140,
      this.y + 90,
      this.x - 130,
      this.y + 90,
      this.x - 145,
      this.y + 190
    );
    triangle(
      this.x - 140,
      this.y + 90,
      this.x - 145,
      this.y + 190,
      this.x - 155,
      this.y + 190
    );
    //fill in the second bottom with second rect color
    fill("#615f64");
    triangle(
      this.x - 145,
      this.y + 190,
      this.x - 140,
      this.y + 190,
      this.x - 138,
      this.y + 145
    );
    //right side triangle side tilt
    fill("#72d0dc");
    triangle(
      this.x + 150,
      this.y + 90,
      this.x + 155,
      this.y + 90,
      this.x + 155,
      this.y + 130
    );
    fill("#fefefe");
    triangle(
      this.x + 140,
      this.y + 90,
      this.x + 150,
      this.y + 90,
      this.x + 155,
      this.y + 190
    );
    triangle(
      this.x + 155,
      this.y + 190,
      this.x + 150,
      this.y + 90,
      this.x + 165,
      this.y + 190
    );
    stroke("#fefefe");
    strokeWeight(2);
    line(this.x + 150, this.y + 90, this.x + 156, this.y + 190);
    noStroke();
    // //main screen rectangle

    fill("#333333");
    rect(this.x - 130, this.y - 150, 270, 240);
    //left side of main screen
    fill(148, 158, 194, 255);
    triangle(
      this.x - 135,
      this.y - 150,
      this.x - 123,
      this.y - 150,
      this.x - 130,
      this.y + 90
    );
    triangle(
      this.x - 130,
      this.y + 90,
      this.x - 135,
      this.y - 150,
      this.x - 141,
      this.y + 90
    );
    //right side of main screen
    triangle(
      this.x + 145,
      this.y - 150,
      this.x + 133,
      this.y - 150,
      this.x + 140,
      this.y + 90
    );
    triangle(
      this.x + 151,
      this.y + 90,
      this.x + 145,
      this.y - 150,
      this.x + 140,
      this.y + 90
    );
    //lines for the sides of the main screen
    stroke(148, 158, 194, 255);
    strokeWeight(2);
    line(this.x + 144, this.y - 149, this.x + 141, this.y + 89);
    line(this.x - 131, this.y + 89, this.x - 134, this.y - 149);
    noStroke();

    //top of the main screen
    fill("#212121");
    rect(this.x - 123, this.y - 180, 256, 30);
    triangle(
      this.x - 123,
      this.y - 180,
      this.x - 130,
      this.y - 180,
      this.x - 123,
      this.y - 150
    );
    triangle(
      this.x + 133,
      this.y - 180,
      this.x + 140,
      this.y - 180,
      this.x + 133,
      this.y - 150
    );
    //left side of top of the main screen
    fill("#677287");
    triangle(
      this.x - 135,
      this.y - 150,
      this.x - 123,
      this.y - 150,
      this.x - 130,
      this.y - 180
    );
    triangle(
      this.x - 135,
      this.y - 150,
      this.x - 140,
      this.y - 180,
      this.x - 130,
      this.y - 180
    );
    //right side of top of the main screen
    triangle(
      this.x + 145,
      this.y - 150,
      this.x + 133,
      this.y - 150,
      this.x + 150,
      this.y - 180
    );
    triangle(
      this.x + 133,
      this.y - 150,
      this.x + 140,
      this.y - 180,
      this.x + 150,
      this.y - 180
    );
    //top recatangle curved white
    fill("#dadceb");
    rect(this.x - 140, this.y - 290, 290, 110, 20, 20, 0, 0);

    //top rectangle curved
    fill("#6c2a8c");
    rect(this.x - 130, this.y - 280, 270, 100, 20, 20, 0, 0);
    stroke("#e90101");
    noFill();
    rect(this.x - 115, this.y - 265, 240, 70, 2, 2);
    fill("#181818");
    rect(this.x - 115, this.y - 140, 240, 220, 5, 5);
    //green screen
    fill("#0a9e6c");
    noStroke();
    rect(this.x - 95, this.y - 120, 200, 180);
    // curved screen sides
    stroke("#0a9e6c");
    //left screen curve
    curve(
      this.x - 55,
      this.y - 80,
      this.x - 95,
      this.y - 120,
      this.x - 95,
      this.y + 60,
      this.x - 55,
      this.y + 20
    );
    //right screen curve
    curve(
      this.x + 65,
      this.y - 80,
      this.x + 105,
      this.y - 120,
      this.x + 105,
      this.y + 60,
      this.x + 65,
      this.y + 20
    );
    //top screen curve
    curve(
      this.x + 10,
      this.y - 30,
      this.x - 95,
      this.y - 120,
      this.x + 105,
      this.y - 120,
      this.x - 105,
      this.y - 30
    );
    //bottom screen curve
    curve(
      this.x + 10,
      this.y - 30,
      this.x - 95,
      this.y + 60,
      this.x + 105,
      this.y + 60,
      this.x - 105,
      this.y - 30
    );
    //main screen shade
    push();
    strokeWeight(1);
    fill("#117b57");
    stroke("#117b57");
    curve(
      this.x + 55,
      this.y - 80,
      this.x + 100,
      this.y - 100,
      this.x + 100,
      this.y + 55,
      this.x + 55,
      this.y + 20
    );
    curve(
      this.x + 70,
      this.y + 20,
      this.x - 70,
      this.y + 60,
      this.x + 100,
      this.y + 55,
      this.x - 105,
      this.y - 30
    );
    triangle(
      this.x + 104,
      this.y - 60,
      this.x + 100,
      this.y + 55,
      this.x + 93,
      this.y + 55
    );
    pop();
    //buttons
    noStroke();
    //first button
    fill("#29303a");
    ellipse(this.x - 80, this.y + 140, 40, 10);
    //fourth button
    ellipse(this.x + 90, this.y + 140, 40, 10);
    //middle buttons
    ellipse(this.x - 20, this.y + 138, 35, 10);
    ellipse(this.x + 30, this.y + 138, 35, 10);
    //button handlers
    fill("#8f99a3");
    rect(this.x - 85, this.y + 120, 10, 25);
    rect(this.x + 85, this.y + 120, 10, 25);
    //smaller button handlers
    fill("#b3bdc9");
    rect(this.x - 85, this.y + 128, 10, 10);
    rect(this.x + 85, this.y + 128, 10, 10);
    //orange thingys on the left
    fill("#fa871d");
    ellipse(this.x - 80, this.y + 90, 20, 25);
    ellipse(this.x - 80, this.y + 103, 15);
    triangle(
      this.x - 90,
      this.y + 90,
      this.x - 85,
      this.y + 120,
      this.x - 75,
      this.y + 120
    );
    triangle(
      this.x - 70,
      this.y + 90,
      this.x - 85,
      this.y + 120,
      this.x - 75,
      this.y + 120
    );
    //left controller shading dark orange
    fill("#f44915");
    triangle(
      this.x - 70,
      this.y + 90,
      this.x - 78,
      this.y + 120,
      this.x - 75,
      this.y + 120
    );
    triangle(
      this.x - 70,
      this.y + 90,
      this.x - 73,
      this.y + 85,
      this.x - 78,
      this.y + 120
    );
    stroke("#f44915");
    line(this.x - 71, this.y + 91, this.x - 77, this.y + 119);
    curve(
      this.x - 100,
      this.y + 95,
      this.x - 80,
      this.y + 78,
      this.x - 71,
      this.y + 91,
      this.x - 85,
      this.y + 100
    );
    curve(
      this.x - 100,
      this.y + 95,
      this.x - 80,
      this.y + 78,
      this.x - 73,
      this.y + 92,
      this.x - 85,
      this.y + 100
    );
    noStroke();
    //white light thingy on controllers
    push();
    translate(this.x - 85, this.y + 85);
    rotate(radians(30));
    fill("#fcfdfb");
    ellipse(0, 0, 5, 10);
    pop();

    //orange thingy on the right
    fill("#fa871d");
    ellipse(this.x + 90, this.y + 90, 20, 25);
    ellipse(this.x + 90, this.y + 103, 15);
    triangle(
      this.x + 100,
      this.y + 90,
      this.x + 95,
      this.y + 120,
      this.x + 85,
      this.y + 120
    );
    triangle(
      this.x + 80,
      this.y + 90,
      this.x + 95,
      this.y + 120,
      this.x + 85,
      this.y + 120
    );
    // right controller dark orange shading
    fill("#f44915");
    triangle(
      this.x + 100,
      this.y + 90,
      this.x + 93,
      this.y + 120,
      this.x + 95,
      this.y + 120
    );
    triangle(
      this.x + 100,
      this.y + 90,
      this.x + 97,
      this.y + 85,
      this.x + 93,
      this.y + 120
    );
    stroke("#f44915");
    line(this.x + 99, this.y + 91, this.x + 93, this.y + 119);
    curve(
      this.x + 70,
      this.y + 95,
      this.x + 90,
      this.y + 78,
      this.x + 99,
      this.y + 91,
      this.x + 85,
      this.y + 100
    );
    curve(
      this.x + 70,
      this.y + 95,
      this.x + 90,
      this.y + 78,
      this.x + 97,
      this.y + 92,
      this.x + 85,
      this.y + 100
    );
    noStroke();
    push();
    translate(this.x + 85, this.y + 85);
    rotate(radians(30));
    fill("#fcfdfb");
    ellipse(0, 0, 5, 10);
    pop();
    //small orange button on the left
    fill("#f44915");
    rect(this.x - 30, this.y + 132, 22, 10);
    stroke("#f44915");
    curve(
      this.x - 90,
      this.y + 130,
      this.x - 29,
      this.y + 142,
      this.x - 9,
      this.y + 142,
      this.x + 70,
      this.y + 130
    );
    //small orange button on the right
    rect(this.x + 20, this.y + 133, 20, 8);
    curve(
      this.x + 100,
      this.y + 135,
      this.x + 40,
      this.y + 142,
      this.x + 20,
      this.y + 142,
      this.x,
      this.y + 135
    );
    //middle buttons circles on top
    noStroke();
    fill("#f9861f");
    ellipse(this.x - 19, this.y + 133, 22, 6);
    ellipse(this.x + 30, this.y + 133, 22, 6);
  }
}
