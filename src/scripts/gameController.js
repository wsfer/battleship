// Play turns with players and change some DOM content after each turn
class GameController {
    #players;

    #DOMContent;

    // Player squares on DOM should come here as a matrix on DOMContent object
    constructor(playerOne, playerTwo, DOMContent) {
        this.#players = [playerTwo, playerOne];
        this.#DOMContent = {
            combatLog: DOMContent.combatLog,
            nextPlayer: DOMContent.nextPlayer,
            winnerName: DOMContent.winnerName,
        };
        DOMContent.combatLog.textContent = 'Nothing is happening';
        DOMContent.nextPlayer.textContent = playerOne.name;

        // This assign makes it easy to change squares on different turns
        playerOne.squares = DOMContent.playerOneSquares;
        playerTwo.squares = DOMContent.playerTwoSquares;
    }

    get nextPlayer() {
        return this.#players[1];
    }

    async play(coords) {
        const attacker = this.#players.pop();
        const defender = this.#players.pop();
        const attack = await attacker.attack(defender, coords);
        this.#players.push(attacker, defender);

        // If it's a sunken ship nothing will happen
        if (attack.isShip) {
            defender.squares[attack.x][attack.y].classList.toggle('sunken');
        } else if (attack.target === 'Water') {
            defender.squares[attack.x][attack.y].classList.toggle('water');
        }

        this.#DOMContent.combatLog.textContent = `${attacker.name} attacked ${defender.name}'s ${attack.target}`;
        this.#DOMContent.nextPlayer.textContent = defender.name;

        if (attack.gameover) {
            this.#DOMContent.winnerName.textContent = attacker.name;
        }

        return {
            attacker: attacker.name,
            defender: defender.name,
            ...attack,
        };
    }
}

export default GameController;
