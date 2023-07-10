// Creates the matrix used on gameboard creation
class FleetBuilder {
    #ships;
    #fleet;
    #validSpaces;

    constructor() {
        this.#ships = new Map([
            [
                'destroyer',
                {
                    name: 'destroyer',
                    size: 2,
                    direction: 'horizontal',
                    positions: null,
                },
            ],
            [
                'submarine',
                {
                    name: 'submarine',
                    size: 3,
                    direction: 'horizontal',
                    positions: null,
                },
            ],
            [
                'cruiser',
                {
                    name: 'cruiser',
                    size: 3,
                    direction: 'horizontal',
                    positions: null,
                },
            ],
            [
                'battleship',
                {
                    name: 'battleship',
                    size: 4,
                    direction: 'horizontal',
                    positions: null,
                },
            ],
            [
                'carrier',
                {
                    name: 'carrier',
                    size: 5,
                    direction: 'horizontal',
                    positions: null,
                },
            ],
        ]);

        this.#fleet = Array(10)
            .fill()
            .map(() => Array(10).fill('water'));

        // To keep track of available coords to place a ship
        // true = valid position to place a ship
        // false = invalid position to place a ship
        this.#validSpaces = Array(10)
            .fill()
            .map(() => Array(10).fill(true));
    }

    #placeShip(ship) {
        ship.positions.main.forEach(([x, y]) => {
            this.#fleet[x][y] = ship.name;
            this.#validSpaces[x][y] = false;
        });
        ship.positions.border.forEach(
            ([x, y]) => (this.#validSpaces[x][y] = false)
        );
    }

    #removeShip(ship) {
        ship.positions.main.forEach(([x, y]) => {
            this.#fleet[x][y] = 'water';
            this.#validSpaces[x][y] = true;
        });
        ship.positions.border.forEach(([x, y]) => {
            if (!this.#isSharedWithAnotherShip([x, y])) {
                this.#validSpaces[x][y] = true;
            }
        });
    }

    // Check if a coord is close to another ship
    #isSharedWithAnotherShip([x, y]) {
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

        for (const [x, y] of closeCoords) {
            if (this.#fleet[x][y] !== 'water') return true;
        }
        return false;
    }

    // Get coords which a ship will occupy on both fleet and validSpaces
    #getFutureCoords(ship, [x, y]) {
        const main = Array(ship.size)
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
            main,
            border,
        };
    }

    // Returns true if all main coords are available to place a ship
    #isValidMove(mainCoords) {
        for (const [x, y] of mainCoords) {
            if (x < 0 || x > 9 || y < 0 || y > 9 || !this.#validSpaces[x][y])
                return false;
        }
        return true;
    }

    changeDirection(shipName) {
        const ship = this.#ships.get(shipName);
        ship.direction =
            ship.direction === 'horizontal' ? 'vertical' : 'horizontal';

        // If the ship was placed, change it's position
        if (ship.positions) {
            this.#removeShip(ship);

            const coords = this.#getFutureCoords(ship, ship.positions.main[0]);
            const isValid = this.#isValidMove(coords.main);

            if (isValid) {
                ship.positions = coords;
                this.#placeShip(ship);
            } else {
                ship.positions = null;
            }

            return {
                isValid,
                target: ship.name,
                size: ship.size,
                direction: ship.direction,
                newPositions: isValid ? coords.main : null,
            };
        }

        return {
            isValid: true,
            target: ship.name,
            size: ship.size,
            direction: ship.direction,
            newPositions: null,
        };
    }

    move(shipName, position) {
        const ship = this.#ships.get(shipName);

        // Remove the ship to avoid conflict if it was placed before
        if (ship.positions) {
            this.#removeShip(ship);
        }

        const coords = this.#getFutureCoords(ship, position);
        const isValid = this.#isValidMove(coords.main);

        // If move is invalid the ship will go back to it's old position
        ship.positions = isValid ? coords : ship.positions;
        if (ship.positions) {
            this.#placeShip(ship);
        }

        return {
            isValid,
            target: ship.name,
            size: ship.size,
            direction: ship.direction,
            newPositions: isValid ? coords.main : null,
        };
    }

    generateRandomFleet() {
        // First clear everything
        this.#fleet = Array(10)
            .fill()
            .map(() => Array(10).fill('water'));

        this.#validSpaces = Array(10)
            .fill()
            .map(() => Array(10).fill(true));

        [...this.#ships.values()].forEach((ship) => {
            ship.positions = null;
        });

        const ships = [...this.#ships.keys()];
        const moves = [];

        while (ships.length > 0) {
            const ship = ships.pop();

            // Creates a matrix of available coords, if it's unavailable set it to false
            // Also filter rows which have only false values
            const coords = this.#validSpaces
                .map((row, x) => row.map((col, y) => (col ? [x, y] : false)))
                .filter((row) => row.filter((col) => col).length > 0);

            // Select a random row from the matrix before and filter all available coords
            const randomRow = coords[
                Math.floor(Math.random() * coords.length)
            ].filter((coord) => coord);

            // Then select one random coord from this row
            const randomCoord =
                randomRow[Math.floor(Math.random() * randomRow.length)];

            // Try moving the ship there, on a random direction
            this.#ships.get(ship).direction = ['horizontal', 'vertical'][
                Math.floor(Math.random() * 2)
            ];
            const move = this.move(ship, randomCoord);
            if (move.isValid) {
                moves.push(move);
            } else {
                ships.push(ship);
            }
        }

        return moves;
    }

    // Returns true if all ships have positions
    isDone() {
        const ships = [...this.#ships.values()];
        const shipsWithPositions = ships.filter(
            (ship) => ship.positions !== null
        );
        return shipsWithPositions.length === ships.length;
    }

    // Returns a COPY of fleet matrix
    getFleet() {
        return this.#fleet.map((row) => row.slice());
    }
}

export default FleetBuilder;
