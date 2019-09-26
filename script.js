const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

const grid = () => Array.from(document.getElementsByClassName('square'));
const sqNumberID = (sqEl) => Number.parseInt(sqEl.id);
const emptySqs = () => grid().filter(sqEl => sqEl.innerText === '');
const allSame = (array) => array.every(sqEl => sqEl.innerText === array[0].innerText && sqEl.innerText !== '');

const takeTurn = (index, letter) => {
  if(grid()[index].innerText == ''){
    grid()[index].innerText = letter;
  }
}
const opponentChoice = () => sqNumberID(emptySqs()[Math.floor(Math.random() * emptySqs().length)]);
const opponentTurn = () => {
  disableListeners();
  setTimeout(() => {
    takeTurn(opponentChoice(), 'o');
    if(!isVictory()){
      enableListeners();
    }
  }, 1000);
}

const endGame = (winningSequence) => {
  winningSequence.forEach(sqEl => sqEl.classList.add('winner'));
  disableListeners();
}

const isVictory = () => {
  let victory = false;
  winningCombos.forEach(_c => {
    const _grid = grid();
    const sequence = [_grid[_c[0]], _grid[_c[1]], _grid[_c[2]]];
    if(allSame(sequence)){
      victory = true;
      endGame(sequence);
    }
  });

  return victory;
}

const click = (e) => {
  takeTurn(sqNumberID(e.target), 'x');
  if(!isVictory()){
    opponentTurn();
  }
  
}

enableListeners = () => grid().forEach(sqEl => sqEl.addEventListener('click',  click));
disableListeners = () => grid().forEach(sqEl => sqEl.removeEventListener('click', click));

enableListeners();