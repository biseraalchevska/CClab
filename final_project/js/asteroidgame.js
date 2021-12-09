let ship;
let asteroids = [];
let lasers = [];
let fart;
let space_bar;
let asteroid;
let invader;
let keys ;
let home;
let controller;
let win1;
let win;
function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function preload(){
  fart = loadSound('assets/shortfart.wav');
  siren = loadSound('assets/cartoon-siren.wav');
  asteroid = loadImage('assets/asteroid.png');
  invader = loadImage('assets/space_inv.png');
  home = loadImage('assets/home.png');
  controller = loadImage('assets/controller.png');
  //win = loadSound('assets/song.wav');
  win1 = loadImage('assets/congrats.gif');


}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  arcadeMachine = new ArcadeMachine(windowWidth / 2, windowHeight / 2);
  ship = new spaceShip();
  for (let i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);
  arcadeMachine.display();
  image(asteroid,windowWidth/2-35,windowHeight/2+150,30,30);
  image(invader,windowWidth/2+5,windowHeight/2+145,50,40);
  image(home,windowWidth/2+73,windowHeight/2+152,35,27);
  image(controller,windowWidth/2-100,windowHeight/2+145,40,40);



  for (let i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      background(random(255),random(255),random(255));
      arcadeMachine.display();
      image(asteroid,windowWidth/2-35,windowHeight/2+150,30,30);
      image(invader,windowWidth/2+5,windowHeight/2+145,50,40);
      image(home,windowWidth/2+73,windowHeight/2+152,35,27);
      image(controller,windowWidth/2-100,windowHeight/2+145,40,40);


      siren.play();
    }
    asteroids[i].display();
    asteroids[i].update();
    asteroids[i].edges();
  }
  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].display();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (let j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 20) {
            let newAsteroid = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroid);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }
  ship.update();
  ship.display();
  ship.turn();
  ship.edges();
  if(asteroids.length<1){
    //you win the game
    //win.play();
    image(win1,windowWidth/2-100,windowHeight/2-130,210,200);
  }
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}
function keyPressed() {
  if (key == " ") {
    fart.play();
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  }
}
class spaceShip {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.velocity = createVector(0, 0);
    this.isBoosting = false;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    stroke("white");
    fill(0);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    triangle(-this.r + 3, this.r, this.r - 3, this.r, 0, this.r + 10);
    line(0, -this.r, -this.r - 6, this.r + 12);
    line(0, -this.r, this.r + 6, this.r + 12);
    pop();
  }
  update() {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.velocity);
    this.velocity.mult(0.99);
  }
  boosting(b) {
    this.isBoosting = b;
  }
  boost() {
    let force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.velocity.add(force);
  }
  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }

  setRotation(a) {
    this.rotation = a;
  }
  //rotate the spaceship
  turn() {
    this.heading += this.rotation;
  }
  hits(asteroid) {
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      return true;
    } else {
      return false;
    }
  }
}
class Asteroid {
  constructor(pos, r) {
    if (pos) {
      this.pos = pos.copy();
    } else {
      this.pos = createVector(random(width), random(height));
    }
    if (r) {
      this.r = r * 0.5;
    } else {
      this.r = random(15, 50);
    }
    this.velocity = p5.Vector.random2D();
    this.total = random(5, 15);
    this.offset = [];
    for (let i = 0; i < this.total; i++) {
      this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
    }
  }
  display() {
    push();
    stroke("white");
    noFill();
    translate(this.pos.x, this.pos.y);
    //ellipse(0,0,this.r*2);
    beginShape();
    for (let i = 0; i < this.total; i++) {
      let angle = map(i, 0, this.total, 0, TWO_PI);
      let x = (this.r + this.offset[i]) * cos(angle);
      let y = (this.r + this.offset[i]) * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
  update() {
    this.pos.add(this.velocity);
  }
  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
  breakup() {
    let newA = [];
    newA[0] = new Asteroid(this.pos, this.r);
    newA[1] = new Asteroid(this.pos, this.r);
    return newA;
  }
}
class Laser {
  constructor(s_pos, angle) {
    this.pos = createVector(s_pos.x, s_pos.y);
    this.velocity = p5.Vector.fromAngle(angle);
    this.velocity.mult(10);
  }
  display() {
    push();
    stroke("white");
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
  }
  update() {
    this.pos.add(this.velocity);
  }
  hits(asteroid) {
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.r) {
      return true;
    } else {
      return false;
    }
  }
  offscreen() {
    if (this.pos.x > width || this.pos.x < 0) {
      return true;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      return true;
    }
    return false;
  }
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
    fill(0);
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
