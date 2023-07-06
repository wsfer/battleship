import ComputerAI from './computerAI';
// By default the tested module has an custom delay of 0~1 seconds which can slow these tests

describe('Not targeting a ship', () => {
    test('Matrix full of values', async () => {
        const coords = Array(10)
            .fill()
            .map((row, x) =>
                Array(10)
                    .fill()
                    .map((col, y) => [x, y])
            );
        const move = await ComputerAI.generateMove(coords, null);
        expect(move).toHaveLength(2);
    });

    test('Matrix with some null values', async () => {
        const coords = Array(10)
            .fill()
            .map((row, x) =>
                Array(10)
                    .fill()
                    .map((col, y) => (y % 2 === 0 ? [x, y] : null))
            );
        const move = await ComputerAI.generateMove(coords, null);
        expect(move).toBeDefined();
        expect(move).toHaveLength(2);
    });

    test('Matrix with some rows full of null values', async () => {
        const coords = Array(10)
            .fill()
            .map((row, x) =>
                Array(10)
                    .fill()
                    .map((col, y) => (x % 2 === 0 ? [x, y] : null))
            );
        const move = await ComputerAI.generateMove(coords, null);
        expect(move).toBeDefined();
        expect(move).toHaveLength(2);
    });
});

describe('Targeting a ship with one discovered position', () => {
    test('All adjacent positions are valid', async () => {
        const coords = Array(10)
            .fill()
            .map((row, x) =>
                Array(10)
                    .fill()
                    .map((col, y) => [x, y])
            );
        coords[3][4] = null;
        const ship = {
            direction: null,
            positions: [[3, 4]],
        };
        const expectedMoves = [
            [3, 3],
            [3, 5],
            [4, 4],
            [2, 4],
        ];
        for (let i = 0; i < 4; i++) {
            const move = await ComputerAI.generateMove(coords, ship);
            expect(expectedMoves).toContainEqual(move);
            coords[move[0]][move[1]] = null;
        }
    });

    test('Some adjacent positions are null', async () => {
        const coords = Array(10)
            .fill()
            .map((row, x) =>
                Array(10)
                    .fill()
                    .map((col, y) => [x, y])
            );
        [coords[3][4], coords[3][3], coords[4][4]] = [null, null, null];
        const ship = {
            direction: null,
            positions: [[3, 4]],
        };
        const expectedMoves = [
            [3, 5],
            [2, 4],
        ];
        for (let i = 0; i < 2; i++) {
            const move = await ComputerAI.generateMove(coords, ship);
            expect(expectedMoves).toContainEqual(move);
            coords[move[0]][move[1]] = null;
        }
    });

    test('Some adjacent positions go off board', async () => {
        const coords = Array(10)
            .fill()
            .map((row, x) =>
                Array(10)
                    .fill()
                    .map((col, y) => [x, y])
            );
        coords[0][0] = null;
        const ship = {
            direction: null,
            positions: [[0, 0]],
        };
        const expectedMoves = [
            [0, 1],
            [1, 0],
        ];
        for (let i = 0; i < 2; i++) {
            const move = await ComputerAI.generateMove(coords, ship);
            expect(expectedMoves).toContainEqual(move);
            coords[move[0]][move[1]] = null;
        }
    });
});

describe('Ship has direction', () => {
    test('horizontal with both adjacent positions valid', async () => {
        const coords = Array(10)
            .fill()
            .map((row, x) =>
                Array(10)
                    .fill()
                    .map((col, y) => [x, y])
            );
        coords[3][4] = null;
        coords[3][5] = null;
        const ship = {
            direction: 'horizontal',
            positions: [
                [3, 4],
                [3, 5],
            ],
        };
        const expectedMoves = [
            [3, 3],
            [3, 6],
        ];
        for (let i = 0; i < 2; i++) {
            const move = await ComputerAI.generateMove(coords, ship);
            expect(expectedMoves).toContainEqual(move);
            coords[move[0]][move[1]] = null;
        }
    });

    test('vertical with both adjacent positions valid', async () => {
        const coords = Array(10)
            .fill()
            .map((row, x) =>
                Array(10)
                    .fill()
                    .map((col, y) => [x, y])
            );
        coords[4][5] = null;
        coords[5][5] = null;
        coords[6][5];
        const ship = {
            direction: 'vertical',
            positions: [
                [4, 5],
                [5, 5],
                [6, 5],
            ],
        };
        const expectedMoves = [
            [3, 5],
            [7, 5],
        ];
        for (let i = 0; i < 2; i++) {
            const move = await ComputerAI.generateMove(coords, ship);
            expect(expectedMoves).toContainEqual(move);
            coords[move[0]][move[1]] = null;
        }
    });

    test('horizontal with one adjacent position invalid', async () => {
        const coords = Array(10)
            .fill()
            .map((row, x) =>
                Array(10)
                    .fill()
                    .map((col, y) => [x, y])
            );
        coords[0][0] = null;
        coords[0][1] = null;
        const ship = {
            direction: 'horizontal',
            positions: [
                [0, 0],
                [0, 1],
            ],
        };
        const expectedMove = [0, 2];
        const move = await ComputerAI.generateMove(coords, ship);
        expect(move).toEqual(expectedMove);
    });

    test('vertical with one adjacent position invalid', async () => {
        const coords = Array(10)
            .fill()
            .map((row, x) =>
                Array(10)
                    .fill()
                    .map((col, y) => [x, y])
            );
        coords[6][4] = null;
        coords[7][4] = null;
        coords[8][4] = null;
        const ship = {
            direction: 'vertical',
            positions: [
                [7, 4],
                [6, 4],
            ],
        };
        const expectedMove = [5, 4];
        const move = await ComputerAI.generateMove(coords, ship);
        expect(move).toEqual(expectedMove);
    });
});

test('Fully discovered rows around a ship', async () => {
    const coords = Array(10)
        .fill()
        .map((row, x) =>
            Array(10)
                .fill()
                .map((col, y) => (x === 7 ? [x, y] : null))
        );
    coords[7][4] = null;
    const ship = {
        direction: null,
        positions: [[7, 4]],
    };
    const expectedMoves = [
        [7, 5],
        [7, 3],
    ];
    for (let i = 0; i < 2; i++) {
        const move = await ComputerAI.generateMove(coords, ship);
        expect(expectedMoves).toContainEqual(move);
        coords[move[0]][move[1]] = null;
    }
});
