//switch 1 and 2 establish which scene is displayed
let switchButton;
let switch1 = true;
let switch2 = false;
//variables
let oneLeaf;
let path;
//arrays for the elements on the screen
let raindrops = [];
let ants = [];
let leaves = [];
//variable for the timer
let timer = 10;
//c is the color array
let c = [];

function setup() {
  let myCanvas = createCanvas(965, 495);
  myCanvas.position(30,140);
  newPath();
  c = [
    [237, 164, 33],
    [233, 134, 4],
    [223, 57, 8],
    [201, 30, 10],
  ];
  oneLeaf = new OneLeaf(110, 70, random(c));
  for (let i = 0; i < 100; i++) {
    leaves.push(new Leaf(random(width), random(0, 50), random(c)));
  }
  for (let i = 0; i < 120; i++) {
    newAnt(random(width), random(height));
  }
  for (let i = 0; i < 100; i++) {
    raindrops.push(new Rain(random(width), random(height)));
  }
}

function draw() {
  background(139, 146, 22);
  for (i = 0; i < 100; i++) {
    raindrops[i].update();
    raindrops[i].display();
  }

  if (switch1 == true) {
      push();
      noStroke();
      fill(255);
      //text("To see instructions, press the button!", 10, 30);
      // let d = dist(mouseX, mouseY, 220, 25);
      // if (d > 5) {
      //   fill(255);
      // } else {
      //   fill(255, 0, 0);
      //   if (mouseIsPressed) {
      //     fill(0,0,0,25);
      //     rect(400, 25, 200, 50);
      //     fill(255);
      //     text("To activate the ants, press +", 400, 40);
      //     text("To go back, press -", 400, 55);
      //     text("To add more ants, press the mouse!", 400, 70);
      //   }
      // }
      // ellipse(220, 25, 10);
      pop();
    for (let i = 0; i < leaves.length; i++) {
      leaves[i].update();
      leaves[i].display();
    }
  }
  // if (keyIsPressed && key == "=") {
  //   switch1 = false;
  //   switch2 = true;
  // }
  // if (keyIsPressed && key == "-") {
  //   switch1 = true;
  //   switch2 = false;
  // }
  if (switch2 == true) {
    oneLeaf.scale();
    oneLeaf.display();
    scale(0.5);
    for (let v of ants) {
      v.applyBehaviors(ants, path);
      v.run();
    }
    if (ants.length > 140) {
      oneLeaf.change();
    }
  }
}
function key1() {
  switch1 = false;
  switch2 = true;
}
function key2(){
  switch1 = true;
  switch2 = false;
}

//a function which adds points for the path to follow
function newPath() {
  path = new Path();
  path.addPoint(332, 214);
  path.addPoint(368, 267);
  path.addPoint(370, 307);
  path.addPoint(404, 282);
  path.addPoint(397, 315);
  path.addPoint(378, 332);
  path.addPoint(426, 318);
  path.addPoint(475, 273);
  path.addPoint(478, 281);
  path.addPoint(429, 324);
  path.addPoint(379, 339);
  path.addPoint(425, 354);
  path.addPoint(453, 384);
  path.addPoint(425, 379);
  path.addPoint(394, 357);
  path.addPoint(400, 400);
  path.addPoint(384, 447);
  path.addPoint(371, 418);
  path.addPoint(367, 371);
  path.addPoint(308, 417);
  path.addPoint(231, 446);
  path.addPoint(277, 371);
  path.addPoint(316, 348);
  path.addPoint(274, 336);
  path.addPoint(235, 291);
  path.addPoint(298, 296);
  path.addPoint(342, 321);
  path.addPoint(312, 294);
}

function newAnt(x, y) {
  let maxspeed = random(2, 4);
  let maxforce = 0.3;
  ants.push(new Ant(x, y, maxspeed, maxforce));
}

function mousePressed() {
  newAnt(mouseX, mouseY);
}

class Path {
  constructor() {
    this.radius = 20;
    this.points = [];
  }

  addPoint(x, y) {
    let point = createVector(x, y);
    this.points.push(point);
  }
}
class Leaf {
  constructor(startX, startY, ccolor) {
    this.x = startX;
    this.y = startY;
    this.speedX = 0.6;
    this.speedY = random(0.5, 3);
    this.opacity = 255;
    this.color = ccolor;
    // this.rotation = random(1,5);
  }
  update() {
    this.y = this.y + this.speedY;
    if (this.y > height) {
      this.y = 0;
      this.x = this.x * -1;
    }
    this.x = this.x + this.speedX;
    if (this.x > width) {
      this.x = 0;
    }
  }
  display() {
    fill(this.color, this.opacity);
    push();
    scale(1.5);
    beginShape();
    vertex(this.x, this.y);
    vertex(this.x + 12, this.y + 18);
    vertex(this.x + 13, this.y + 32);
    vertex(this.x + 18, this.y + 27);
    vertex(this.x + 24, this.y + 23);
    vertex(this.x + 22, this.y + 34);
    vertex(this.x + 16, this.y + 40);
    vertex(this.x + 32, this.y + 35);
    vertex(this.x + 48, this.y + 20);
    vertex(this.x + 49, this.y + 23);
    vertex(this.x + 32, this.y + 37);
    vertex(this.x + 16, this.y + 42);
    vertex(this.x + 31, this.y + 47);
    vertex(this.x + 41, this.y + 57);
    vertex(this.x + 31, this.y + 55);
    vertex(this.x + 21, this.y + 48);
    vertex(this.x + 23, this.y + 63);
    vertex(this.x + 23, this.y + 63);
    vertex(this.x + 18, this.y + 78);
    vertex(this.x + 14, this.y + 68);
    vertex(this.x + 12, this.y + 53);
    vertex(this.x - 8, this.y + 68);
    vertex(this.x - 33, this.y + 78);
    vertex(this.x - 18, this.y + 53);
    vertex(this.x - 5, this.y + 45);
    vertex(this.x - 19, this.y + 41);
    vertex(this.x - 32, this.y + 26);
    vertex(this.x - 11, this.y + 28);
    vertex(this.x + 4, this.y + 36);
    vertex(this.x - 6, this.y + 27);
    endShape(CLOSE);
    pop();
  }
  scale() {
    scale(2);
  }
  change() {
    if (frameCount % 60 == 0 && timer > 0) {
      this.opacity = this.opacity - 20;
      timer--;
    }
    if (timer == 0) {
      this.opacity = 0;
      text("The Ants have eaten the Leaf!", 50, 150);
    }
  }
}
class OneLeaf {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.speedX = 0.6;
    this.speedY = random(0.5, 3);
    this.opacity = 255;
    this.candyx = startX;
    this.candyy = startY;
    // this.rotation = random(1,5);
  }
  update() {
    this.y = this.y + this.speedY;
    if (this.y > height) {
      this.y = 0;
      this.x = this.x * -1;
    }
    this.x = this.x + this.speedX;
    if (this.x > width) {
      this.x = 0;
    }
  }
  display() {
    fill(223, 57, 8, this.opacity);
    push();
    scale(1.5);
    beginShape();
    vertex(this.x, this.y);
    vertex(this.x + 12, this.y + 18);
    vertex(this.x + 13, this.y + 32);
    vertex(this.x + 18, this.y + 27);
    vertex(this.x + 24, this.y + 23);
    vertex(this.x + 22, this.y + 34);
    vertex(this.x + 16, this.y + 40);
    vertex(this.x + 32, this.y + 35);
    vertex(this.x + 48, this.y + 20);
    vertex(this.x + 49, this.y + 23);
    vertex(this.x + 32, this.y + 37);
    vertex(this.x + 16, this.y + 42);
    vertex(this.x + 31, this.y + 47);
    vertex(this.x + 41, this.y + 57);
    vertex(this.x + 31, this.y + 55);
    vertex(this.x + 21, this.y + 48);
    vertex(this.x + 23, this.y + 63);
    vertex(this.x + 23, this.y + 63);
    vertex(this.x + 18, this.y + 78);
    vertex(this.x + 14, this.y + 68);
    vertex(this.x + 12, this.y + 53);
    vertex(this.x - 8, this.y + 68);
    vertex(this.x - 33, this.y + 78);
    vertex(this.x - 18, this.y + 53);
    vertex(this.x - 5, this.y + 45);
    vertex(this.x - 19, this.y + 41);
    vertex(this.x - 32, this.y + 26);
    vertex(this.x - 11, this.y + 28);
    vertex(this.x + 4, this.y + 36);
    vertex(this.x - 6, this.y + 27);
    endShape(CLOSE);
    noStroke();
    fill(54, 191, 245);
    ellipse(this.candyx + 8, this.candyy + 45, 7);
    triangle(
      this.candyx + 8,
      this.candyy + 45,
      this.candyx,
      this.candyy + 40,
      this.candyx,
      this.candyy + 50
    );
    triangle(
      this.candyx + 8,
      this.candyy + 45,
      this.candyx + 16,
      this.candyy + 40,
      this.candyx + 16,
      this.candyy + 50
    );
    pop();
  }
  scale() {
    scale(2);
  }
  change() {
    if (frameCount % 60 == 0 && timer > 0) {
      this.opacity = this.opacity - 20;
      timer--;
    }
    if (timer == 0) {
      this.opacity = 0;
      text("The Ants have destroyed the Leaf!", 250, 150);
      this.candyx = 800;
      this.candyy = 800;
    }
  }
}
class Rain {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.scale = random(1, 2);
    this.speedY = random(1, 5);
  }
  update() {
    this.y = this.y + this.speedY;
    if (this.y > height) {
      this.y = 0;
    }
  }
  display() {
    push();
    scale(this.scale);
    fill(255, 255, 255, 40);
    noStroke();
    ellipse(this.x, this.y, 10, 10);
    triangle(this.x - 5, this.y, this.x + 5, this.y, this.x, this.y - 10);
    pop();
  }
}

// The Nature of Code
// Daniel Shiff http://natureofcode.com

// Path Following
// Vehicle class

class Ant {

  // Constructor initialize all values
  constructor(x, y, ms, mf) {
    this.position = createVector(x, y);
    this.r = 12;
    this.maxspeed = ms;
    this.maxforce = mf;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(this.maxspeed, 0);
  }

  // A function to deal with path following and separation
  applyBehaviors(ants, path) {
    // Follow path force
    let f = this.follow(path);
    // Separate from other boids force
    let s = this.separate(ants);
    // Arbitrary weighting
    f.mult(3);
    s.mult(1);
    // Accumulate in acceleration
    this.applyForce(f);
    this.applyForce(s);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // Main "run" function
   run() {
    this.update();
    this.render();
  }


  // This function implements Craig Reynolds' path following algorithm
  // http://www.red3d.com/cwr/steer/PathFollow.html
  follow(path) {

    // Predict position 25 (arbitrary choice) frames ahead
    let predict = this.velocity.copy();
    predict.normalize();
    predict.mult(25);
    let predictpos = p5.Vector.add(this.position, predict);

    // Now we must find the normal to the path from the predicted position
    // We look at the normal for each line segment and pick out the closest one
    let normal = null;
    let target = null;
    let worldRecord = 1000000; // Start with a very high worldRecord distance that can easily be beaten

    // Loop through all points of the path
    for (let i = 0; i < path.points.length; i++) {

      // Look at a line segment
      let a = path.points[i];
      let b = path.points[(i + 1) % path.points.length]; // Note Path has to wraparound

      // Get the normal point to that line
      let normalPoint = getNormalPoint(predictpos, a, b);

      // Check if normal is on line segment
      let dir = p5.Vector.sub(b, a);
      // If it's not within the line segment, consider the normal to just be the end of the line segment (point b)
      //if (da + db > line.mag()+1) {
      if (normalPoint.x < min(a.x, b.x) || normalPoint.x > max(a.x, b.x) || normalPoint.y < min(a.y, b.y) || normalPoint.y > max(a.y, b.y)) {
        normalPoint = b.copy();
        // If we're at the end we really want the next line segment for looking ahead
        a = path.points[(i + 1) % path.points.length];
        b = path.points[(i + 2) % path.points.length]; // Path wraps around
        dir = p5.Vector.sub(b, a);
      }

      // How far away are we from the path?
      let d = p5.Vector.dist(predictpos, normalPoint);
      // Did we beat the worldRecord and find the closest line segment?
      if (d < worldRecord) {
        worldRecord = d;
        normal = normalPoint;

        // Look at the direction of the line segment so we can seek a little bit ahead of the normal
        dir.normalize();
        // This is an oversimplification
        // Should be based on distance to path & velocity
        dir.mult(25);
        target = normal.copy();
        target.add(dir);
      }
    }

    // Only if the distance is greater than the path's radius do we bother to steer
    if (worldRecord > path.radius) {
      return this.seek(target);
    } else {
      return createVector(0, 0);
    }
  }

  // Separation
  // Method checks for nearby boids and steers away
  separate(boids) {
    let desiredseparation = this.r * 2;
    let steer = createVector(0, 0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let other = boids[i];
      let d = p5.Vector.dist(this.position, other.position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, other.position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }


  // Method to update position
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the position to the target

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Vepositionity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    return steer;
  }


  render() {
    fill(0);
    stroke(0);
    push();
    translate(this.position.x, this.position.y);
    ellipse(0, 0, this.r, this.r);
    ellipse(5, 5, this.r-1, this.r-1);
    ellipse(10, 10, this.r-2, this.r-2);
    fill(255);
    ellipse(8,10,4,4);
    ellipse(12,10,4,4);
    line(0,0,-10,10);
    line(8,8,0,20);
    pop();
  }

}

// A function to get the normal point from a point (p) to a line segment (a-b)
// This function could be optimized to make fewer new Vector objects
function getNormalPoint(p, a, b) {
  // Vector from a to p
  let ap = p5.Vector.sub(p, a);
  // Vector from a to b
  let ab = p5.Vector.sub(b, a);
  ab.normalize(); // Normalize the line
  // Project vector "diff" onto line by using the dot product
  ab.mult(ap.dot(ab));
  let normalPoint = p5.Vector.add(a, ab);
  return normalPoint;
}

//Code References
//The Nature of Code
//Daniel Shiffman
//http://natureofcode.com
//Path Following
// Vehicle class
// https://editor.p5js.org/tianrandesign/sketches/rkBAHA3h
