// Creates the matrix used on gameboard creation
class FleetBuilder {
    constructor() {
        this.ships = new Map([
            [
                'destroyer',
                {
                    length: 2,
                    direction: 'horizontal',
                    positions: null,
                },
            ],
            [
                'submarine',
                {
                    length: 3,
                    direction: 'horizontal',
                    positions: null,
                },
            ],
            [
                'cruiser',
                {
                    length: 3,
                    direction: 'horizontal',
                    positions: null,
                },
            ],
            [
                'battleship',
                {
                    length: 4,
                    direction: 'horizontal',
                    positions: null,
                },
            ],
            [
                'carrier',
                {
                    length: 5,
                    direction: 'horizontal',
                    positions: null,
                },
            ],
        ]);

        this.fleet = Array(10)
            .fill()
            .map(() => Array(10).fill('water'));

        // To keep track of available coords to place a ship
        // true = valid position to place a ship
        // false = invalid position to place a ship
        this.validSpaces = Array(10)
            .fill()
            .map(() => Array(10).fill(true));
    }

    changeDirection(shipName) {
        const ship = this.ships.get(shipName);
        ship.direction =
            ship.direction === 'horizontal' ? 'vertical' : 'horizontal';

        // If the ship was on board, move it or remove if the new positions are invalid
        if (ship.positions) {
            if (ship.positions) {
                ship.positions.main.forEach(([x, y]) => {
                    this.fleet[x][y] = 'water';
                    this.validSpaces[x][y] = true;
                });
                ship.positions.border.forEach(([x, y]) => {
                    if (!this.isSharedWithAnotherShip([x, y])) {
                        this.validSpaces[x][y] = true;
                    }
                });
            }

            const coords = this.getFutureCoords(ship, ship.positions.main[0]);
            const isValid = this.isValidMove(coords.main);
            ship.positions = isValid ? coords : null;

            if (ship.positions) {
                ship.positions.main.forEach(([x, y]) => {
                    this.fleet[x][y] = shipName;
                    this.validSpaces[x][y] = false;
                });
                ship.positions.border.forEach(
                    ([x, y]) => (this.validSpaces[x][y] = false)
                );
            }

            return {
                isValid,
                target: shipName,
                direction: ship.direction,
                newPositions: isValid ? coords.main : null,
            };
        }

        return {
            isValid: true,
            target: shipName,
            direction: ship.direction,
            newPositions: null,
        };
    }

    move(shipName, position) {
        const ship = this.ships.get(shipName);

        // Starts by removing the ship from both matrix to avoid conflict
        // if it has been already placed
        if (ship.positions) {
            ship.positions.main.forEach(([x, y]) => {
                this.fleet[x][y] = 'water';
                this.validSpaces[x][y] = true;
            });
            ship.positions.border.forEach(([x, y]) => {
                if (!this.isSharedWithAnotherShip([x, y])) {
                    this.validSpaces[x][y] = true;
                }
            });
        }

        const coords = this.getFutureCoords(ship, position);
        const isValid = this.isValidMove(coords.main);

        // If the move is valid just change it's coords
        // else keep it as it was to go back to your old position
        ship.positions = isValid ? coords : ship.positions;

        // And place the ship again, if it has positions
        if (ship.positions) {
            ship.positions.main.forEach(([x, y]) => {
                this.fleet[x][y] = shipName;
                this.validSpaces[x][y] = false;
            });
            ship.positions.border.forEach(
                ([x, y]) => (this.validSpaces[x][y] = false)
            );
        }

        return {
            isValid,
            target: shipName,
            direction: ship.direction,
            newPositions: isValid ? coords.main : null,
        };
    }

    // Get coords which a ship will occupy and make invalid fr other ships
    getFutureCoords(ship, [x, y]) {
        const main = Array(ship.length)
            .fill()
            .map((coord, index) =>
                ship.direction === 'horizontal'
                    ? [x, y + index]
                    : [x + index, y]
            );

        const xValues = [];
        const yValues = [];
        for (let i = main[0][0] - 1; i <= main[main.length - 1][0] + 1; i++) {
            xValues.push(i);
        }
        for (let i = main[0][1] - 1; i <= main[main.length - 1][1] + 1; i++) {
            yValues.push(i);
        }

        // Get all possible combinations and filter coords which are on main or go out board
        const border = xValues
            .flatMap((x) => yValues.map((y) => [x, y]))
            .filter(
                ([x, y]) =>
                    x >= 0 &&
                    x < 10 &&
                    y >= 0 &&
                    y < 10 &&
                    !main.map(([mx, my]) => mx === x && my === y).includes(true)
            );

        return {
            main: main,
            border: border,
        };
    }

    // Receives an array of coords and returns true if all coords are available
    // to place a ship on spaces parameter
    isValidMove(coords, spaces) {
        const a = coords.map(([x, y]) =>
            x >= 0 && x < 10 && y >= 0 && y < 10
                ? this.validSpaces[x][y]
                : false
        );

        return !a.includes(false);
    }

    // Check if a coord is close to another ship
    // condition: a ship in one close coords
    isSharedWithAnotherShip([x, y]) {
        const closeCoords = [
            [x - 1, y - 1],
            [x - 1, y],
            [x - 1, y + 1],
            [x, y - 1],
            [x, y + 1],
            [x + 1, y - 1],
            [x + 1, y],
            [x + 1, y + 1],
        ].filter(([x, y]) => x >= 0 && x < 10 && y >= 0 && y < 10);

        return closeCoords
            .map(([x, y]) => this.fleet[x][y] === 'water')
            .includes(false);
    }
}

export default FleetBuilder;
