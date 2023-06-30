import Gameboard from './gameboard';

const mockMatrix = [
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
].map((str) =>
    str
        .replaceAll('c', 'cruiser')
        .replaceAll('D', 'destroyer')
        .replaceAll('S', 'submarine')
        .replaceAll('B', 'battleship')
        .replaceAll('C', 'carrier')
        .replaceAll('W', 'water')
        .split(' ')
);

let gameboard;

beforeEach(() => {
    gameboard = new Gameboard(mockMatrix);
});

test('Attack water', () => {
    const attack = gameboard.receiveAttack([2, 1]);
    const fleet = gameboard.getFleet();
    expect(attack).toEqual({ target: 'Water' });
});

test('Attack a ship', () => {
    const attack = gameboard.receiveAttack([0, 2]);
    const fleet = gameboard.getFleet();
    expect(fleet[0][2]).toBe('Sunken ship');
    expect(attack).toEqual({
        target: 'Destroyer',
        size: 2,
        health: 1,
        gameover: false,
    });
});

test('Attack a sunken ship', () => {
    gameboard.receiveAttack([0, 2]);
    const attack = gameboard.receiveAttack([0, 2]);
    const fleet = gameboard.getFleet();
    expect(fleet[0][2]).toBe('Sunken ship');
    expect(attack).toEqual({ target: 'Sunken ship' });
});

test('Sunken a single ship', () => {
    gameboard.receiveAttack([0, 2]);
    const lastAttack = gameboard.receiveAttack([1, 2]);
    const fleet = gameboard.getFleet();
    expect(fleet[0][2]).toBe('Sunken ship');
    expect(fleet[1][2]).toBe('Sunken ship');
    expect(lastAttack).toEqual({
        target: 'Destroyer',
        size: 2,
        health: 0,
        gameover: false,
    });
});

test('Sunken all ships', () => {
    const shipPositions = [
        [0, 2],
        [1, 2],
        [3, 2],
        [3, 3],
        [3, 4],
        [5, 4],
        [5, 5],
        [5, 6],
        [8, 3],
        [8, 4],
        [8, 5],
        [8, 6],
        [5, 9],
        [6, 9],
        [7, 9],
        [8, 9],
    ];

    shipPositions.forEach((coord) => gameboard.receiveAttack(coord));
    const lastAttack = gameboard.receiveAttack([9, 9]);
    expect(lastAttack.gameover).toBeTruthy;
});
