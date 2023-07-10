// Add events liteners related to game loop
class EventCreator {
    static addFleetScreenEvents(page, fleetBuilder) {
        let selectedShip = null;
        const selectedShipText = page.querySelector('.js-selected-ship');
        const ships = page.querySelectorAll('.js-ship');
        const squares = page.querySelectorAll('.js-square');
        const rotateButton = page.querySelector('.js-rotate-ship');
        const unselectButton = page.querySelector('.js-unselect-ship');
        const startGameButton = page.querySelector('.js-start-game');

        page.querySelector('.js-random-fleet').addEventListener('click', () => {
            const moves = fleetBuilder.generateRandomFleet();
            moves.forEach((move) => {
                const ship = document.getElementById(move.target);
                const [x, y] = move.newPositions[0];
                const square = squares[x * 10 + y];
                square.appendChild(ship);
                if (ship.dataset.direction !== move.direction) {
                    ship.dataset.direction = move.direction;
                    [ship.style.width, ship.style.height] = [
                        ship.style.height,
                        ship.style.width,
                    ];
                }
            });
            startGameButton.disabled = false;
        });
        rotateButton.addEventListener('click', () => {
            if (selectedShip !== null) {
                const move = fleetBuilder.changeDirection(
                    selectedShip.dataset.name
                );
                selectedShip.dataset.direction =
                    selectedShip.dataset.direction === 'horizontal'
                        ? 'vertical'
                        : 'horizontal';
                [selectedShip.style.width, selectedShip.style.height] = [
                    selectedShip.style.height,
                    selectedShip.style.width,
                ];
                if (!move.isValid) {
                    document
                        .querySelector('.js-fleet')
                        .appendChild(selectedShip);
                    startGameButton.disabled = true;
                }
            }
        });
        unselectButton.addEventListener('click', (e) => {
            if (selectedShip !== null) {
                selectedShip.classList.toggle('.selected');
                selectedShip = null;
                selectedShipText.classList.remove('action-text');
                selectedShipText.textContent = 'No ship';
                e.target.classList.toggle('disabled');
                rotateButton.disabled = true;
                unselectButton.disabled = true;
            }
        });
        ships.forEach((ship) => {
            ship.addEventListener('click', (e) => {
                if (selectedShip !== e.target) {
                    if (selectedShip !== null) {
                        selectedShip.classList.toggle('.selected');
                    } else {
                        rotateButton.disabled = false;
                        unselectButton.disabled = false;
                    }
                    selectedShip = e.target;
                    e.target.classList.toggle('.selected');
                    selectedShipText.textContent =
                        e.target.dataset.name.charAt(0).toUpperCase() +
                        e.target.dataset.name.slice(1);
                    selectedShipText.classList.add('action-text');
                    document
                        .querySelector('.js-unselect-ship')
                        .classList.toggle('disabled');
                    rotateButton.disabled = false;
                    unselectButton.disabled = false;
                }
            });
            ship.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('ship', e.target.id);
                if (selectedShip !== e.target) {
                    if (selectedShip !== null) {
                        selectedShip.classList.toggle('.selected');
                    } else {
                        rotateButton.disabled = false;
                        unselectButton.disabled = false;
                    }
                    selectedShip = e.target;
                    e.target.classList.toggle('.selected');
                    selectedShipText.textContent =
                        e.target.dataset.name.charAt(0).toUpperCase() +
                        e.target.dataset.name.slice(1);
                    selectedShipText.classList.add('action-text');
                    document
                        .querySelector('.js-unselect-ship')
                        .classList.toggle('disabled');
                }
            });
        });
        page.querySelector('.js-fleet').addEventListener('dragover', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('.js-square')) {
                e.target.classList.add('selected');
            }
        });
        page.querySelector('.js-fleet').addEventListener('dragleave', (e) => {
            if (e.target.classList.contains('.js-square')) {
                e.target.classList.remove('selected');
            }
        });
        page.querySelector('.js-fleet').addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('js-square')) {
                e.target.classList.remove('selected');
                const id = e.dataTransfer.getData('ship');
                const ship = document.getElementById(id);
                const [x, y] = [
                    Number(e.target.dataset.x),
                    Number(e.target.dataset.y),
                ];
                const move = fleetBuilder.move(id, [x, y]);
                if (move.isValid) {
                    e.target.appendChild(ship);
                    if (fleetBuilder.isDone()) {
                        startGameButton.disabled = false;
                    }
                }
            }
        });
    }

    static addGameScreenEvents(page, game, audio) {
        const combatLog = page.querySelector('.js-combat-log');
        const currentPlayer = page.querySelector('.js-player-name-turn');
        const computerFleet = page.querySelector('.js-computer-fleet');
        const playerSquares = page.querySelectorAll(
            '.js-player-fleet > .js-square'
        );
        const winnerName = page.querySelector('.js-winner');

        computerFleet.addEventListener('click', async (e) => {
            if (e.target.classList.contains('js-square')) {
                computerFleet.classList.toggle('disabled');

                const [x, y] = [
                    Number(e.target.dataset.x),
                    Number(e.target.dataset.y),
                ];
                const playerTurn = await game.play([x, y]);
                combatLog.textContent = `${playerTurn.attacker} attacked ${playerTurn.defender}'s ${playerTurn.target}`;
                currentPlayer.textContent = playerTurn.defender;

                if (playerTurn.isShip) {
                    e.target.classList.add('sunken');

                    document.querySelector(
                        `.js-computer-${playerTurn.target.toLowerCase()}`
                    ).style.backgroundImage = `linear-gradient(to left, var(--secondary) 0 ${Math.round(
                        (playerTurn.health / playerTurn.size) * 100
                    )}%, var(--light-opaque) ${Math.round(
                        (playerTurn.health / playerTurn.size) * 100
                    )}% 100%)`;

                    audio.playExplosion();
                } else {
                    e.target.classList.add('water');
                    audio.playSplash();
                }

                if (playerTurn.gameover) {
                    document.body.classList.toggle('gameover');
                    winnerName.textContent = playerTurn.attacker;
                    return;
                }

                const computerTurn = await game.play(null);
                combatLog.textContent = `${computerTurn.attacker} attacked ${computerTurn.defender}'s ${computerTurn.target}`;
                currentPlayer.textContent = computerTurn.defender;

                if (computerTurn.isShip) {
                    playerSquares[
                        computerTurn.x * 10 + computerTurn.y
                    ].classList.add('sunken');

                    document.querySelector(
                        `.js-player-${computerTurn.target.toLowerCase()}`
                    ).style.backgroundImage = `linear-gradient(to right, var(--secondary) 0 ${Math.round(
                        (computerTurn.health / computerTurn.size) * 100
                    )}%, var(--light-opaque) ${Math.round(
                        (computerTurn.health / computerTurn.size) * 100
                    )}% 100%)`;

                    audio.playExplosion();
                } else {
                    playerSquares[
                        computerTurn.x * 10 + computerTurn.y
                    ].classList.add('water');
                    audio.playSplash();
                }

                if (computerTurn.gameover) {
                    document.body.classList.toggle('gameover');
                    winnerName.textContent = computerTurn.attacker;
                    return;
                }

                computerFleet.classList.toggle('disabled');
            }
        });
    }
}

export default EventCreator;
