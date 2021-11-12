let roundButton = document.getElementById('roundButton');
roundButton.addEventListener('click', roundButtonClicked);
function roundButtonClicked(){
  let rectElem=document.getElementById('rect');
  rectElem.style.borderRadius = '50px';
}

let rectButton = document.getElementById('rectButton');
rectButton.addEventListener('click', rectButtonClicked);
function rectButtonClicked(){
  let rectElem=document.getElementById('rect');
  rectElem.style.borderRadius = '0px';
}



let i = 0;
i = i + 2;
console.log('My javascript file has loaded');
console.log('i is:',i);

function say(what){
  //alert(what);
  //Step 1: find the element we want to manipulate
  let elem = document.getElementById('lyrics');
  //Step 2: create new element to be added to div
  let newElem = document.createElement('p');
  //Step 2.5: change the element's content
  newElem.innerHTML = what;
  //Step 3: add the new element to our lyrics div
  elem.appendChild(newElem);

  elem = document.getElementById('heading');
  let rectElem = document.getElementById('rect');
  if(what == 'Harder'){
    elem.style.backgroundColor = 'red';
  }else{
    elem.style.backgroundColor = 'blue';
  }

}


let raindrops = [];
num_raindrops = 50;
function setup() {
  createCanvas(600, 600);
  for ( let i = 0;i<num_raindrops;i++){
    raindrops.push(new Raindrop(random(width),random(height)));
  }
}

function draw() {
  background(0, 0, 255);
  fill(0,127,0);
  rect(0,300,width,height/2);
  for(let i = 0;i<num_raindrops;i++){
    raindrops[i].update();
    raindrops[i].display();
  }
}

class Raindrop{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.scale = random(1,3);
    this.speedY = random(5,10);
  }
  update(){
    this.y = this.y + this.speedY;
    if (this.y >height/2){
      this.y = 0;
    }


  }
  display(){
    push();
    translate(this.x,this.y);
    scale(this.scale);
    fill(255);
    noStroke();
    ellipse(0,0,10,10);
    triangle(-5,0,5,0,0,-10);
    pop();


  }
}
