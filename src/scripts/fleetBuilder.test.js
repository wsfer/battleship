import FleetBuilder from './fleetBuilder';

describe('Test methods', () => {
    let builder;

    beforeEach(() => {
        builder = new FleetBuilder();
        builder.move('destroyer', [0, 0]);
    });

    test('Get future ship coords of a move', () => {
        const shipMock = jest
            .fn()
            .mockReturnValueOnce({
                length: 3,
                direction: 'vertical',
            })
            .mockReturnValue({
                length: 2,
                direction: 'horizontal',
            });

        expect(builder.getFutureCoords(shipMock(), [0, 0])).toEqual({
            main: [
                [0, 0],
                [1, 0],
                [2, 0],
            ],
            border: [
                [0, 1],
                [1, 1],
                [2, 1],
                [3, 0],
                [3, 1],
            ],
        });

        expect(builder.getFutureCoords(shipMock(), [5, 4])).toEqual({
            main: [
                [5, 4],
                [5, 5],
            ],
            border: [
                [4, 3],
                [4, 4],
                [4, 5],
                [4, 6],
                [5, 3],
                [5, 6],
                [6, 3],
                [6, 4],
                [6, 5],
                [6, 6],
            ],
        });
    });

    test('Check if a set of coords is a valid move', () => {
        const coordsMock = jest
            .fn()
            .mockReturnValueOnce([
                [0, 0],
                [1, 0],
                [2, 0],
            ])
            .mockReturnValueOnce([
                [9, 9],
                [9, 10],
            ])
            .mockReturnValueOnce([
                [1, 2],
                [1, 3],
            ])
            .mockReturnValueOnce([
                [3, 4],
                [4, 4],
            ])
            .mockReturnValue([
                [0, 0],
                [0, 1],
            ]);

        // There's a destroyer on [0, 0][0, 1]
        expect(builder.isValidMove(coordsMock())).toBeFalsy;

        // Out board
        expect(builder.isValidMove(coordsMock())).toBeFalsy;

        // Close to destroyer on [0, 0][0, 1]
        expect(builder.isValidMove(coordsMock())).toBeFalsy;

        expect(builder.isValidMove(coordsMock())).toBeTruthy;
        expect(builder.isValidMove(coordsMock())).toBeTruthy;
    });
});

describe('Ship moving tests', () => {
    let builder;

    beforeEach(() => {
        builder = new FleetBuilder();
    });

    test('Valid coord - horizontal', () => {
        const move = builder.move('destroyer', [0, 0]);
        expect(builder.fleet[0][0]).toBe('destroyer');
        expect(builder.fleet[0][1]).toBe('destroyer');
        expect(move).toEqual({
            isValid: true,
            target: 'destroyer',
            direction: 'horizontal',
            newPositions: [
                [0, 0],
                [0, 1],
            ],
        });
    });

    test('Valid coord - vertical', () => {
        builder.changeDirection('destroyer');
        const move = builder.move('destroyer', [5, 4]);
        expect(builder.fleet[5][4]).toBe('destroyer');
        expect(builder.fleet[6][4]).toBe('destroyer');
        expect(move.isValid).toBeTruthy;
    });

    test('Move a ship to another position', () => {
        builder.move('destroyer', [0, 0]);
        const move = builder.move('destroyer', [2, 2]);
        expect(builder.fleet[0][0]).toBe('water');
        expect(builder.fleet[0][1]).toBe('water');
        expect(builder.fleet[2][2]).toBe('destroyer');
        expect(builder.fleet[2][3]).toBe('destroyer');
        expect(move.isValid).toBeTruthy;
    });

    test('Change direction to valid position', () => {
        builder.move('destroyer', [0, 0]);
        const move = builder.changeDirection('destroyer');
        expect(builder.fleet[0][0]).toBe('destroyer');
        expect(builder.fleet[1][0]).toBe('destroyer');
        expect(builder.fleet[0][1]).toBe('water');
        expect(move.isValid).toBeTruthy;
    });

    test('Change direction to invalid position - ship must be removed', () => {
        builder.move('destroyer', [9, 8]);
        const move = builder.changeDirection('destroyer');
        expect(builder.fleet[9][8]).toBe('water');
        expect(builder.fleet[9][9]).toBe('water');
        expect(move.isValid).toBeFalsy;
    });

    test('Invalid coord - go off-board', () => {
        const move = builder.move('destroyer', [0, 9]);
        expect(builder.fleet[0][9]).toBe('water');
        expect(move.isValid).toBeFalsy;
    });

    test('Invalid coord - already occupied', () => {
        builder.move('carrier', [0, 0]);
        const move = builder.move('destroyer', [0, 1]);
        expect(builder.fleet[0][1]).toBe('carrier');
        expect(builder.fleet[0][2]).toBe('carrier');
        expect(move.isValid).toBeFalsy;
    });

    test('Invalid coord - next to another ship', () => {
        builder.move('carrier', [0, 0]);
        const move = builder.move('destroyer', [1, 1]);
        expect(builder.fleet[1][1]).toBe('water');
        expect(builder.fleet[1][2]).toBe('water');
        expect(move.isValid).toBeFalsy;
    });
});
