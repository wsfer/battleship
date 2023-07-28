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
        const playerName = page.querySelector('.js-player-name');

        playerName.addEventListener('input', (e) => {
            if (e.target.value === '') {
                startGameButton.disabled = true;
            } else if (fleetBuilder.isDone()) {
                startGameButton.disabled = false;
            }
        });
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
            if (playerName.value !== '') {
                startGameButton.disabled = false;
            }
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
                        .querySelector('.js-ship-dock')
                        .appendChild(selectedShip);
                    startGameButton.disabled = true;
                }
            }
        });
        unselectButton.addEventListener('click', (e) => {
            if (selectedShip !== null) {
                selectedShip.classList.toggle('selected');
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
                        selectedShip.classList.toggle('selected');
                    } else {
                        rotateButton.disabled = false;
                        unselectButton.disabled = false;
                    }
                    selectedShip = e.target;
                    e.target.classList.toggle('selected');
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
                        selectedShip.classList.toggle('selected');
                    } else {
                        rotateButton.disabled = false;
                        unselectButton.disabled = false;
                    }
                    selectedShip = e.target;
                    e.target.classList.toggle('selected');
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
                    if (fleetBuilder.isDone() && playerName.value !== '') {
                        startGameButton.disabled = false;
                    }
                }
            }
        });
    }

    static addGameScreenEvents(page, game, audio, playerOne, playerTwo) {
        const playerOneFleet = page.querySelector('.js-player-one-fleet');
        const playerTwoFleet = page.querySelector('.js-player-two-fleet');
        playerOneFleet.classList.toggle('disabled');

        if (!playerOne.isComputer && !playerTwo.isComputer) {
            // Player vs Player
            playerTwoFleet.addEventListener('click', (e) => {
                if (
                    e.target.classList.contains('js-square') &&
                    !playerTwoFleet.classList.contains('disabled')
                ) {
                    const turn = this.#playTurn(
                        [
                            Number(e.target.dataset.x),
                            Number(e.target.dataset.y),
                        ],
                        game,
                        audio,
                        playerOneFleet,
                        playerTwoFleet
                    );

                    if (turn.gameover) {
                        document.body.classList.toggle('popup');
                    }
                }
            });
            playerOneFleet.addEventListener('click', (e) => {
                if (
                    e.target.classList.contains('js-square') &&
                    !playerOneFleet.classList.contains('disabled')
                ) {
                    const turn = this.#playTurn(
                        [
                            Number(e.target.dataset.x),
                            Number(e.target.dataset.y),
                        ],
                        game,
                        audio,
                        playerTwoFleet,
                        playerOneFleet
                    );

                    if (turn.gameover) {
                        document.body.classList.toggle('popup');
                    }
                }
            });
        } else if (!playerOne.isComputer) {
            // PLayer vs Computer
            playerTwoFleet.addEventListener('click', async (e) => {
                if (
                    e.target.classList.contains('js-square') &&
                    !playerTwoFleet.classList.contains('disabled')
                ) {
                    const playerTurn = this.#playTurn(
                        [
                            Number(e.target.dataset.x),
                            Number(e.target.dataset.y),
                        ],
                        game,
                        audio,
                        playerOneFleet,
                        playerTwoFleet
                    );

                    if (playerTurn.gameover) {
                        document.body.classList.toggle('popup');
                        return;
                    }

                    // Small delay for computer attack
                    await new Promise((resolve) => {
                        setTimeout(resolve, Math.random() * 1000 + 1000);
                    });

                    const computerTurn = this.#playTurn(
                        null,
                        game,
                        audio,
                        playerTwoFleet,
                        playerOneFleet
                    );

                    if (computerTurn.gameover) {
                        document.body.classList.toggle('popup');
                    }
                }
            });
        }
    }

    static #playTurn(coords, game, audio, attackerFleet, defenderFleet) {
        const turn = game.play(coords);
        defenderFleet.classList.toggle('disabled');

        if (turn.isShip) {
            audio.playExplosion();
        } else {
            audio.playSplash();
        }

        attackerFleet.classList.toggle('disabled');
        return turn;
    }
}

export default EventCreator;
