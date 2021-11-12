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
