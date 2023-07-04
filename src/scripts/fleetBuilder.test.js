import FleetBuilder from './fleetBuilder';

let builder;

beforeEach(() => {
    builder = new FleetBuilder();
});

test('Move a ship to a valid coord in horizontal direction', () => {
    const move = builder.move('destroyer', [0, 0]);
    const fleet = builder.getFleet();
    expect(move).toEqual({
        isValid: true,
        target: 'destroyer',
        size: 2,
        direction: 'horizontal',
        newPositions: [
            [0, 0],
            [0, 1],
        ],
    });
    expect([fleet[0][0], fleet[0][1]]).toEqual(['destroyer', 'destroyer']);
});

test('Change direction of a unplaced ship', () => {
    const move = builder.changeDirection('destroyer');
    expect(move).toEqual({
        isValid: true,
        target: 'destroyer',
        size: 2,
        direction: 'vertical',
        newPositions: null,
    });
});

test('Move a ship to a valid coord in vertical direction', () => {
    builder.changeDirection('destroyer');
    const move = builder.move('destroyer', [5, 4]);
    const fleet = builder.getFleet();
    expect(move).toEqual({
        isValid: true,
        target: 'destroyer',
        size: 2,
        direction: 'vertical',
        newPositions: [
            [5, 4],
            [6, 4],
        ],
    });
    expect([fleet[5][4], fleet[6][4]]).toEqual(['destroyer', 'destroyer']);
});

test('Move a ship from one position to another', () => {
    builder.move('destroyer', [0, 0]);
    const move2 = builder.move('destroyer', [4, 4]);
    const fleet = builder.getFleet();
    expect(move2).toEqual({
        isValid: true,
        target: 'destroyer',
        size: 2,
        direction: 'horizontal',
        newPositions: [
            [4, 4],
            [4, 5],
        ],
    });
    expect([fleet[0][0], fleet[0][1]]).toEqual(['water', 'water']);
    expect([fleet[4][4], fleet[4][5]]).toEqual(['destroyer', 'destroyer']);
});

test('Change direction of placed ship - valid case', () => {
    builder.move('destroyer', [0, 0]);
    const move = builder.changeDirection('destroyer');
    const fleet = builder.getFleet();
    expect(move).toEqual({
        isValid: true,
        target: 'destroyer',
        size: 2,
        direction: 'vertical',
        newPositions: [
            [0, 0],
            [1, 0],
        ],
    });
    expect(fleet[0][1]).toBe('water');
    expect([fleet[0][0], fleet[1][0]]).toEqual(['destroyer', 'destroyer']);
});

test('Change direction of placed ship - invalid case', () => {
    builder.move('destroyer', [9, 8]);
    const move = builder.changeDirection('destroyer');
    const fleet = builder.getFleet();
    expect(move).toEqual({
        isValid: false,
        target: 'destroyer',
        size: 2,
        direction: 'vertical',
        newPositions: null,
    });
    expect([fleet[9][8], fleet[9][9]]).toEqual(['water', 'water']);
});

test('Move ship to invalid coord which go off-board', () => {
    const move = builder.move('carrier', [0, 9]);
    const fleet = builder.getFleet();
    expect(move).toEqual({
        isValid: false,
        target: 'carrier',
        size: 5,
        direction: 'horizontal',
        newPositions: null,
    });
    expect(fleet[0][9]).toBe('water');
});

test('Move ship to already occupied coord', () => {
    builder.move('submarine', [0, 0]);
    const move = builder.move('destroyer', [0, 1]);
    const fleet = builder.getFleet();
    expect(move).toEqual({
        isValid: false,
        target: 'destroyer',
        size: 2,
        direction: 'horizontal',
        newPositions: null,
    });
    expect([fleet[0][1], fleet[0][2]]).toEqual(['submarine', 'submarine']);
});

test('Move ship to invalid coord next to another ship', () => {
    builder.move('carrier', [0, 0]);
    const move = builder.move('destroyer', [1, 1]);
    const fleet = builder.getFleet();
    expect(move).toEqual({
        isValid: false,
        target: 'destroyer',
        size: 2,
        direction: 'horizontal',
        newPositions: null,
    });
    expect([fleet[1][1], fleet[1][2]]).toEqual(['water', 'water']);
});

test('Moving a close ship right next to another ship is invalid', () => {
    builder.move('destroyer', [6, 3]);
    builder.move('submarine', [8, 3]);
    const move = builder.move('submarine', [7, 3]);
    expect(move).toEqual({
        isValid: false,
        target: 'submarine',
        size: 3,
        direction: 'horizontal',
        newPositions: null,
    });
});

// This one is hard to test because everything is random.
// needs a more complex function to check if placed ships are in valid positions
//
// To see the fleet: console.table(fleet)
test('Generate a random fleet', () => {
    const moves = builder.generateRandomFleet();
    const fleet = builder.getFleet();

    moves.forEach((move) => {
        expect(move.isValid).toBeTruthy;
        move.newPositions.forEach(([x, y]) => {
            expect(fleet[x][y]).toBe(move.target);
        });
    });

    expect(builder.isDone()).toBeTruthy;
});
