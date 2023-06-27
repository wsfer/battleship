class Ship {
    #length;
    #health;
    #type;
    constructor(length, type) {
        this.#length = length;
        this.#health = length;
        this.#type = type;
    }

    get length() {
        return this.#length;
    }

    get health() {
        return this.#health;
    }

    hit() {
        if (this.#health > 0) {
            this.#health -= 1;
        }

        return {
            target: this.#type,
            length: this.#length,
            health: this.#health,
        };
    }

    isSunk() {
        return this.#health === 0;
    }
}

export default Ship;
