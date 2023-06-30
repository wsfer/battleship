import Ship from './ship';

// Receives a matrix with object names and creates the fleet matrix, which has references to
// game objects (ships, water, sunken ship) with it's own hit() methods
class Gameboard {
    #objects;

    #fleet;

    constructor(matrix) {
        this.#objects = new Map([
            ['destroyer', new Ship(2, 'Destroyer')],
            ['submarine', new Ship(3, 'Submarine')],
            ['cruiser', new Ship(3, 'Cruiser')],
            ['battleship', new Ship(4, 'Battleship')],
            ['carrier', new Ship(5, 'Carrier')],
            ['water', new Ship(0, 'Water')],
            ['sunken', new Ship(0, 'Sunken ship')],
        ]);

        this.#fleet = matrix.map((row) =>
            row.map((name) => this.#objects.get(name))
        );
    }

    receiveAttack([x, y]) {
        const target = this.#fleet[x][y];
        const hit = target.hit();

        // When target is a ship
        if (target.size > 0) {
            this.#fleet[x][y] = this.#objects.get('sunken');
            return {
                ...hit,
                gameover: target.isSunk() ? this.#isGameOver() : false,
            };
        }

        // When target is water or sunken ship
        return {
            target: hit.target,
        };
    }

    // Returns true if all ships are sunk
    #isGameOver() {
        const ships = [...this.#objects.values()];
        const sunkenShips = ships.filter((ship) => ship.isSunk());
        return sunkenShips.length === ships.length;
    }

    getFleet() {
        return this.#fleet.map((row) => row.map((obj) => obj.name));
    }
}

export default Gameboard;
