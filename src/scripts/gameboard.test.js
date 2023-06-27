import Gameboard from './gameboard';

const matrix = [
    'W W D W W W W W W W',
    'W W D W W W W W W W',
    'W W W W W W W W W W',
    'W W S S S W W W W W',
    'W W W W W W W W W W',
    'W W W W c c c W W C',
    'W W W W W W W W W C',
    'W W W W W W W W W C',
    'W W W B B B B W W C',
    'W W W W W W W W W C',
].map((str) => {
    return str
        .replaceAll('c', 'cruiser')
        .replaceAll('D', 'destroyer')
        .replaceAll('S', 'submarine')
        .replaceAll('B', 'battleship')
        .replaceAll('C', 'carrier')
        .replaceAll('W', 'water')
        .split(' ');
});

let gameboard;
let destroyer;
let submarine;
let cruiser;
let battleship;
let carrier;
let water;
let sunken;

beforeEach(() => {
    gameboard = new Gameboard(matrix);
    destroyer = gameboard.objects.get('destroyer');
    submarine = gameboard.objects.get('submarine');
    cruiser = gameboard.objects.get('cruiser');
    battleship = gameboard.objects.get('battleship');
    carrier = gameboard.objects.get('carrier');
    water = gameboard.objects.get('water');
    sunken = gameboard.objects.get('sunken');
});

test('Attack water', () => {
    const attack = gameboard.receiveAttack([2, 1]);
    expect(gameboard.fleet[2][1]).toBe(water);
    expect(attack).toEqual({
        target: 'Water',
        length: 0,
        health: 0,
        gameover: false,
    });
});

test('Attack a ship', () => {
    const attack = gameboard.receiveAttack([0, 2]);
    expect(gameboard.fleet[0][2]).toBe(sunken);
    expect(attack).toEqual({
        target: 'Destroyer',
        length: 2,
        health: 1,
        gameover: false,
    });
});

test('Attack a sunken ship', () => {
    gameboard.receiveAttack([0, 2]);
    const attack = gameboard.receiveAttack([0, 2]);
    expect(gameboard.fleet[0][2]).toBe(sunken);
    expect(attack).toEqual({
        target: 'Sunken ship',
        length: 0,
        health: 0,
        gameover: false,
    });
});

test('Sunken a single ship', () => {
    gameboard.receiveAttack([0, 2]);
    const lastAttack = gameboard.receiveAttack([1, 2]);
    expect(gameboard.fleet[0][2]).toBe(sunken);
    expect(gameboard.fleet[1][2]).toBe(sunken);
    expect(lastAttack).toEqual({
        target: 'Destroyer',
        length: 2,
        health: 0,
        gameover: false,
    });
});

test('Sunken all ships', () => {
    const lastAttack = gameboard.fleet.reduce((last, row) => {
        return row.reduce((last, obj) => obj.hit());
    });

    expect(lastAttack.gameover).toBeTruthy;
});
