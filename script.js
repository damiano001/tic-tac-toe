const X_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
const O_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';

//vettore per spazi liberi
const freeBoxes = [];
// Mappa: numero di box -> 'x' o 'o'
const takenBoxes = {};
//prende tutti i grid all'interno di div con id grid
const boxes = document.querySelectorAll('#grid div');
//li rende cliccabili col listener 
for (const box of boxes)
{
  box.addEventListener('click', changeToX);
  freeBoxes.push(box); //inserisce all'interno dell'array
}



function assignSpace(space, owner)
{
  const image = document.createElement('img');
  image.src = owner === 'x' ? X_IMAGE_URL : O_IMAGE_URL;
  space.appendChild(image);
  //aggiornamento vettori  
  //(si puo fare anche con parseInt se si usano i data-index, in questo modo è diverso space.id)
  takenBoxes[space.id] = owner;
  const indexToRemove = freeBoxes.indexOf(space);
  freeBoxes.splice(indexToRemove, 1); //toglie l'elemento da freeboxes
  space.removeEventListener('click', changeToX);
}

//event handler 
function changeToX(event)
{
  assignSpace(event.currentTarget, 'x');  

  if (isGameOver())
  {
    displayWinner();
  }
  else
  {
    computerChooseO();
  }
}

function computerChooseO()
{
  const index = Math.floor(Math.random() * freeBoxes.length);
  const freeSpace = freeBoxes[index];

  assignSpace(freeSpace, 'o');

  if (isGameOver())
  {
    displayWinner();
  }
}

function isGameOver()
{
  return freeBoxes.length === 0 || getWinner() !== null;
}

function displayWinner()
{
  const winner = getWinner();

  const resultContainer = document.querySelector('#results');
  const header = document.createElement('h1');

  if (winner === 'x')
    header.textContent = 'Hai vinto!';
  else if (winner === 'o')
    header.textContent = 'Hai perso...';
  else
    header.textContent = 'Pareggio';


 resultContainer.appendChild(header);

  // Rimuovi gli event listener restanti
  for (const box of freeBoxes)
  {
    box.removeEventListener('click', changeToX);
  }
}

function checkBoxes(one, two, three)
{
  if (takenBoxes[one] !== undefined &&
      takenBoxes[one] === takenBoxes[two] &&
      takenBoxes[two] === takenBoxes[three])
  {
    return takenBoxes[one];
  }
  return null;
}

// Ritorna 'x', 'o' o null se non c'è ancora un vincitore
function getWinner()
{
  // Controlla le righe
  let rowResult = checkBoxes('one', 'two', 'three') ||
      checkBoxes('four', 'five', 'six') ||
      checkBoxes('seven', 'eight', 'nine');

  // Controlla le colonne
  let colResult = checkBoxes('one', 'four', 'seven') ||
      checkBoxes('two', 'five', 'eight') ||
      checkBoxes('three', 'six', 'nine');

  // Controlla le diagonali
  let diagonalResult = checkBoxes('one', 'five', 'nine') ||
      checkBoxes('three', 'five', 'seven');
  return rowResult || colResult || diagonalResult;
}


/* metodo 2
function getWinner2(){

  for(let col = 0; col<3; col++){
    const offset = col * 3;
    let result = checkBoxes(offset , offset +1,offset+2) || checkBoxes(col, col+3,col+6);

    if (result) return result;

  }
  return checkBoxes(0,4,8) || checkBoxes(2,4,6);


}



*/




