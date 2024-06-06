import {Ship, Player, Gameboard} from './logic';

// Get the player board container
const playerBoardContainer = document.getElementById('player-board');
const opponentBoardContainer = document.getElementById('opponent-board');

const obattleship = document.querySelector('#obattleship');
const osubmarine = document.querySelector('#osubmarine');
const ocruiser = document.querySelector('#ocruiser');
const ogunboat = document.querySelector('#ogunboat');

const pbattleship = document.querySelector('#pbattleship');
const psubmarine = document.querySelector('#psubmarine');
const pcruiser = document.querySelector('#pcruiser');
const pgunboat = document.querySelector('#pgunboat');
const status = document.querySelector('.game-status');

function checkSunk(boat, field) {
  if(boat.sunk === true) field.textContent = 'Sunk!';
}

function checkVictory() {

  if(playerone.ship.state.totalhealth === 0) {
    status.textContent = "CPU Wins";
    const cellElements = document.querySelectorAll('.cell');
    cellElements.forEach((element) => {
    const clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);
});
  }
  if(cpuplayer.ship.state.totalhealth === 0) {
    status.textContent = "Player Wins";
    const cellElements = document.querySelectorAll('.cell');
    cellElements.forEach((element) => {
    const clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);
});
}}

// Create a div container for the game board
function display() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.querySelector(`#p${row}${col}`);
      if(playerone.board.grid[row][col] !== 0) {
        switch(playerone.board.grid[row][col]) {
          case 1:
          case 2:
          case 3:
          case 4:
            cell.style.backgroundColor = 'pink';
            break;
          case 5:
            cell.style.backgroundColor = 'red';
            break;
          case 6:
            cell.style.backgroundColor = 'black';
            break;           
          default:
            console.log("Error");
        }
      }
    }
  }


  checkSunk(playerone.ship.battleship, pbattleship);
  checkSunk(playerone.ship.submarine, psubmarine);
  checkSunk(playerone.ship.cruiser, pcruiser);
  checkSunk(playerone.ship.gunship, pgunboat);

  checkSunk(cpuplayer.ship.battleship, obattleship);
  checkSunk(cpuplayer.ship.submarine, osubmarine);
  checkSunk(cpuplayer.ship.cruiser, ocruiser);
  checkSunk(cpuplayer.ship.gunship, ogunboat);

  checkVictory();
}



// Loop through rows and columns to create cells
function createBoards (x) {
  const boardContainer = document.createElement('div');
  boardContainer.classList.add('board');
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = `${row}${col}`; // You can replace this with your desired content
      cell.id = `${x}${row}${col}`;
      boardContainer.appendChild(cell);
      if (x === 'o') {
        const handleCellClick = () => {
          cell.style.backgroundColor = 'black';
          cpuplayer.board.receiveAttack(cpuplayer.ship, cpuplayer.board, [`${row}`, `${col}`]);
          if (cpuplayer.board.grid[`${row}`][`${col}`] === 5) cell.style.backgroundColor = 'green';
          // let rand1 = getRandomInt(0, 7);
          // let rand2 = getRandomInt(0, 7);
          let rand1;
          let rand2;
          do {
            rand1 = getRandomInt(0, 7);
            rand2 = getRandomInt(0, 7);
          } while (playerone.board.grid[rand1][rand2] > 4)
          // Need to fix random integer logic, cannot select coordinate that is already hit
          playerone.board.receiveAttack(playerone.ship, playerone.board, [rand1, rand2]);
          display();
          cell.removeEventListener('click', handleCellClick);
        };
        cell.addEventListener('click', handleCellClick);
      }

    }
  }
  return boardContainer;
}


// Append the board container to the player board div
playerBoardContainer.appendChild(createBoards('p'));
opponentBoardContainer.appendChild(createBoards('o'));

let playerone = new Player();
let cpuplayer = new Player();

playerone.board.place(playerone.ship, playerone.board);
console.log(playerone.board.grid);
cpuplayer.board.place(cpuplayer.ship, cpuplayer.board);
console.log(cpuplayer.board.grid);




display();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function reset() {
  playerBoardContainer.innerHTML = '';
  opponentBoardContainer.innerHTML = '';
  playerone = new Player();
  cpuplayer = new Player();
  playerBoardContainer.appendChild(createBoards('p'));
  opponentBoardContainer.appendChild(createBoards('o'));
  playerone.board.place(playerone.ship, playerone.board);
  cpuplayer.board.place(cpuplayer.ship, cpuplayer.board);
  display();
  obattleship.textContent = 'Afloat';
  osubmarine.textContent = 'Afloat';
  ocruiser.textContent = 'Afloat';
  ogunboat.textContent= 'Afloat';
  pbattleship.textContent = 'Afloat';
  psubmarine.textContent = 'Afloat';
  pcruiser.textContent = 'Afloat';
  pgunboat.textContent= 'Afloat';
  status.textContent = 'Battle underway';
}

const button = document.querySelector('#reset');
button.addEventListener('click', reset);