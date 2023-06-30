class Ship {
    #size;

    #health;

    #name;

    constructor(size, name) {
        this.#size = size;
        this.#health = size;
        this.#name = name;
    }

    get size() {
        return this.#size;
    }

    get health() {
        return this.#health;
    }

    get name() {
        return this.#name;
    }

    hit() {
        if (this.#health > 0) {
            this.#health -= 1;
        }

        return {
            target: this.#name,
            size: this.#size,
            health: this.#health,
        };
    }

    isSunk() {
        return this.#health === 0;
    }
}

export default Ship;
