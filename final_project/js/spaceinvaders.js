let squids = [];
let pokemons = [];
let mario;
let squid;
let pokemon;
let cnv;
let sound;
let spongebob;
let win;
let hit_sound;
function preload() {
  mario = loadImage("assets/mario.png");
  squid = loadImage("assets/squid.png");
  pokemon = loadImage("assets/pokemon.png");
  sound = loadSound('assets/mario.wav');
  sponge = loadSound('assets/christmas.wav');
  win = loadImage('assets/win.gif');
  hit_sound = loadSound('assets/ouch.mp3');
}
function setup() {
  cnv = createCanvas(600, 400);
  cnv.position(windowWidth/2-300,windowHeight/2-200);
  Mario = new marioObject();
  for (let i = 0; i < 6; i++) {
    squids[i] = new squidWard(i * 80 + 80, 60);
  }
}

function draw() {
  background(51);
  for (let i = 0; i < pokemons.length; i++) {
    pokemons[i].display();
    pokemons[i].update();
    for (let j = 0; j < squids.length; j++) {
      if (pokemons[i].hits(squids[j])) {
        squids.splice(j, 1);
        pokemons[i].evaporate();
        hit_sound.play();
      }
    }
  }
  Mario.display();
  Mario.move();
  if(squids.length<1){
    sponge.play();
    image(win,windowWidth/2-652,windowHeight/2-320,610,400);
  }
  var edge = false;

  for (let i = 0; i < squids.length; i++) {
    squids[i].display();
    squids[i].update();
    if (squids[i].x > width || squids[i].x < 0) {
      edge = true;
    }
  }

  if (edge) {
    for (let i = 0; i < squids.length; i++) {
      squids[i].shiftDown();
    }
  }

  for (let i = pokemons.length - 1; i >= 0; i--) {
    if (pokemons[i].toDelete) {
      pokemons.splice(i, 1);
    }
  }
}

function keyReleased() {
  if (key != " ") {
    Mario.setDir(0);
  }
}

function keyPressed() {
  if (key === " ") {
    let ball = new pokeBall(Mario.x, height);
    pokemons.push(ball);
    sound.play();
  }

  if (keyCode === RIGHT_ARROW) {
    Mario.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    Mario.setDir(-1);
  }
}
class marioObject {
  constructor() {
    this.x = width / 2;
    this.xdir = 0;
  }
  display() {
    fill(255);
    rectMode(CENTER);
    image(mario, this.x, height - 70, 50, 70);
  }

  setDir(dir) {
    this.xdir = dir;
  }

  move(dir) {
    this.x += this.xdir * 5;
  }
}
class squidWard {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 30;
    this.xdir = 1;
  }
  shiftDown() {
    this.xdir *= -1;
    this.y += this.r;
    // if (this.y > 400) {
    //   background("red");
    // }
  }
  update() {
    this.x = this.x + this.xdir;
  }
  display() {
    noStroke();
    fill(255, 0, 200, 150);
    image(squid, this.x, this.y, this.r * 2, this.r * 2);
  }
}

class pokeBall{
  constructor(x, y) {
  this.x = x+15;
  this.y = y;
  this.r = 8;
  this.toDelete = false;
  }

  display() {
    image(pokemon,this.x,this.y,this.r*3,this.r*3);
  }

  evaporate() {
    this.toDelete = true;
  }

  hits(squid) {
    let d = dist(this.x, this.y, squid.x, squid.y);
    if (d < this.r + squid.r) {
      return true;
    } else {
      return false;
    }
  }

  update(){
    this.y = this.y - 5;
  }
}
