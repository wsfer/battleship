class Player {
    #name;

    #gameboard;

    constructor(name, gameboard) {
        this.#name = name;
        this.#gameboard = gameboard;
        this.isComputer = false;
    }

    get name() {
        return this.#name;
    }

    receiveAttack([x, y]) {
        return this.#gameboard.receiveAttack([x, y]);
    }

    async attack(player, coords) {
        return player.receiveAttack(coords);
    }
}

export default Player;
