class GameController {
    #players;

    constructor(playerOne, playerTwo) {
        this.#players = [playerTwo, playerOne];
    }

    get nextPlayer() {
        return this.#players[1];
    }

    async play(coords) {
        const attacker = this.#players.pop();
        const defender = this.#players.pop();
        const attack = await attacker.attack(defender, coords);
        this.#players.push(attacker, defender);
        return {
            attacker: attacker.name,
            defender: defender.name,
            ...attack,
        };
    }
}

export default GameController;
