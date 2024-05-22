function Ship() {
    const battleship = {
        health: 4,
        length: 4,
        sunk: false
    }

    const submarine = {
        health: 3,
        length: 3,
        sunk: false
    }

    const cruiser = {
        health: 2,
        length: 2,
        sunk: false
    }

    const gunship = {
        health: 1,
        length: 1,
        sunk: false
    }

    const hit = (boat) => {
        boat.health = boat.health - 1;
        if(boat.health === 0) boat.sunk = true;
        return boat.health;
    }

    return {battleship, submarine, cruiser, gunship, hit};
}

function rando(x) {
    return Math.floor(Math.random() * (x + 1));
}

function randomPlace (x) {
    if(rando(1) === 1) {
        let xaxis = rando(8 - x);
        let yaxis = rando(8);
        for(i = 0; i < x; i++) {
            grid[xaxis + i][yaxis] = 1;
        }
    } else {
        let xaxis = rando(8);
        let yaxis = rando(8 - x);
        for(i = 0; i < x; i++) {
            grid[xaxis][yaxis + i] = 1;
        }
    } 
}



function Gameboard() {
    const grid = Array.from({ length: 8 }, () => Array(8).fill(0));

    const place = (ship) => {
        // places battleship
        if(rando(1) === 1) {
            let xaxis = rando(8 - ship.battleship.length);
            let yaxis = rando(8);
            console.log(rando(8 - ship.battleship.length))
            for(i = 0; i < ship.battleship.length; i++) {
                grid[xaxis + i][yaxis] = 1;
            }
        } else {
            let xaxis = rando(8);
            let yaxis = rando(8 - ship.battleship.length);
            console.log(rando(8 - ship.battleship.length))
            for(i = 0; i < ship.battleship.length; i++) {
                grid[xaxis][yaxis + i] = 1;
            }
        } 
    }

    return {grid, place};
}

const jimmy = new Ship();
const travis = new Gameboard();
travis.place(jimmy);
console.log(travis.grid);


module.exports = Ship;

