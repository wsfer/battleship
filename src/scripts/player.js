class Player {
    #fleet;
    constructor(fleet) {
        this.#fleet = fleet;
    }

    receiveAttack(coords) {
        return this.#fleet.receiveAttack(coords);
    }

    attack(opponent, coords) {
        return opponent.receiveAttack(coords);
    }
}

export default Player;
