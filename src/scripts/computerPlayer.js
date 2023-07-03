import Player from './player';
import ComputerAI from './computerAI';

class ComputerPlayer extends Player {
    #isComputer;

    #coords;

    #targetShip;

    constructor(name, gameboard) {
        super(name, gameboard);
        this.#isComputer = true;
        this.#coords = Array(10)
            .fill()
            .map((row, x) =>
                Array(10)
                    .fill()
                    .map((col, y) => [x, y])
            );
        this.#targetShip = null;
    }

    attack(player) {
        const coords = ComputerAI.generateMove(this.#coords, this.#targetShip);
        const attack = player.receiveAttack(coords);

        this.#coords[attack.x][attack.y] = null;

        if (attack.isShip) {
            // First case: found a newly ship
            // Second case: destroyed target ship
            // Third case: add new position and update ship direction
            if (this.#targetShip === null) {
                this.#targetShip = {
                    direction: null,
                    positions: [[attack.x, attack.y]],
                };
            } else if (this.#targetShip.positions.length - 1 === attack.size) {
                this.#targetShip = null;
            } else {
                const [shipX] = this.#targetShip.positions;
                this.#targetShip.positions.push([attack.x, attack.y]);
                this.#targetShip.direction =
                    attack.x === shipX ? 'horizontal' : 'vertical';
            }
        }

        return attack;
    }
}

export default ComputerPlayer;
