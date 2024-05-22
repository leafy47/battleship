const Ship = require('./index');

test('health decreases when boat is hit', () => {
    const jimmy = new Ship();
    
    jimmy.hit(jimmy.battleship);
    jimmy.hit(jimmy.battleship);
    jimmy.hit(jimmy.battleship);
    expect(jimmy.battleship.health).toBe(1);
})

test('Sinks when health reach 0', () => {
    const jimmy = new Ship();
    
    jimmy.hit(jimmy.battleship);
    jimmy.hit(jimmy.battleship);
    jimmy.hit(jimmy.battleship);
    jimmy.hit(jimmy.battleship);
    expect(jimmy.battleship.sunk).toBeTruthy();
})