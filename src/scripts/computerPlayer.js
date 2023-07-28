import Player from './player';

class ComputerPlayer extends Player {
    #computerAI;

    #coords;

    #targetShip;

    constructor(name, gameboard, computerAI) {
        super(name, gameboard);
        this.#coords = Array(10)
            .fill()
            .map((row, x) =>
                Array(10)
                    .fill()
                    .map((col, y) => [x, y])
            );
        this.#targetShip = null;
        this.#computerAI = computerAI;
        this.isComputer = true;
    }

    attack(player) {
        const coords = this.#computerAI.generateMove(
            this.#coords,
            this.#targetShip
        );

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
            } else if (this.#targetShip.positions.length + 1 === attack.size) {
                this.#targetShip = null;
            } else {
                const [shipCoordX] = this.#targetShip.positions[0];
                this.#targetShip.positions.push([attack.x, attack.y]);
                this.#targetShip.direction =
                    attack.x === shipCoordX ? 'horizontal' : 'vertical';
            }
        }

        return attack;
    }
}

export default ComputerPlayer;
