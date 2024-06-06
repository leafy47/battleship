function Ship() {
    const battleship = {
        health: 4,
        length: 4,
        sunk: false,
        legend: 1
    }

    const submarine = {
        health: 3,
        length: 3,
        sunk: false,
        legend: 2
    }

    const cruiser = {
        health: 2,
        length: 2,
        sunk: false,
        legend: 3
    }

    const gunship = {
        health: 1,
        length: 1,
        sunk: false,
        legend: 4
    }

    const state = {
        totalhealth: 10
    }

    const hit = (boat) => {
        state.totalhealth -= 1;
        boat.health -= 1;
        if(boat.health === 0) boat.sunk = true;
    }

    return {battleship, submarine, cruiser, gunship, hit, state};
}

function rando(x) {
    return Math.floor(Math.random() * (x + 1));
}

function randomPlace (ship, board) {
    // places battleship
    if(rando(1) === 1) {
        let xaxis = rando(7 - ship.length);
        let yaxis = rando(7);
        for(let i = 0; i < ship.length; i++) {
            board.grid[xaxis + i][yaxis] = 1;
        }
    } else {
        let xaxis = rando(7);
        let yaxis = rando(7 - ship.length);
        for(let i = 0; i < ship.length; i++) {
            board.grid[xaxis][yaxis + i] = 1;
        }
    }
}

function randomPlace2 (ship, board, x) {
    // places other ships
    if(rando(1) === 1) {
        let yaxis;
        let xaxis;
        let collisionDetected
        do {
            collisionDetected = false;
            xaxis = rando(7 - ship.length);
            yaxis = rando(7);
            for(let i = 0; i < ship.length; i++) {
                if(board.grid[xaxis+i][yaxis] !== 0) {
                collisionDetected = true;
                break;
                }
            }
        } while(collisionDetected);
        for(let i = 0; i < ship.length; i++) {
            board.grid[xaxis + i][yaxis] = ship.legend;
        }
    } else {
        let yaxis;
        let xaxis;
        let collisionDetected;
        do {
            collisionDetected = false;
            xaxis = rando(7);
            yaxis = rando(7 - ship.length);
            for(let i = 0; i < ship.length; i++) {
                if(board.grid[xaxis][yaxis+i] !== 0) {
                collisionDetected = true;
                break;
                }
            }
        } while(collisionDetected);
        for(let i = 0; i < ship.length; i++) {
            board.grid[xaxis][yaxis + i] = ship.legend;
        }
    }
}

// function check(health) {
//     if(health === 0) {
//         alert("Game Over");
//     }
// }





function Gameboard() {
    const grid = Array.from({ length: 8 }, () => Array(8).fill(0));


    const place = (ship, board) => {
        randomPlace(ship.battleship, board);
        randomPlace2(ship.submarine, board);
        randomPlace2(ship.cruiser, board);
        randomPlace2(ship.gunship, board);
    }

    const receiveAttack = (ship, board, coords) => {
        const target = board.grid[coords[0]][coords[1]];
        if(target !== 0) {
            board.grid[coords[0]][coords[1]] = 5;
            switch(target) {
                case 1:
                    ship.hit(ship.battleship);
                    break;
                case 2:
                    ship.hit(ship.submarine);
                    break;
                case 3:
                    ship.hit(ship.cruiser);
                    break;
                case 4:
                    ship.hit(ship.gunship);
                    break;
                default:
                    console.log("Error");
            }
            // check(ship.totalhealth);
        } else {
            board.grid[coords[0]][coords[1]] = 6;
        }
    }

    return {grid, place, receiveAttack};
}

function Player() {
    const board = new Gameboard;
    const ship = new Ship;

    return {ship, board};
}

// const jimmy = new Ship();
// const travis = new Gameboard();
// travis.place(jimmy, travis);
// console.log(travis.grid);


// module.exports = Ship;

export {Ship, Player, Gameboard};
