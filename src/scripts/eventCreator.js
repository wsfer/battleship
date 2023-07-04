/**
 * Add events liteners to page related to game loop
 */
class EventCreator {
    static addStartPageEvents(page, music) {
        page.querySelector('.js-sound').addEventListener('click', (e) => {
            e.target.classList.toggle('on');
            music.muted = !music.muted;
        });
    }

    static addFleetPageEvents(page, music, fleetBuilder) {
        page.querySelector('.js-sound').addEventListener('click', (e) => {
            e.target.classList.toggle('on');
            music.muted = !music.muted;
        });

        let selectedShip = null;
        const selectedShipText = page.querySelector('.js-selected-ship');
        const ships = page.querySelectorAll('.js-ship');
        const squares = page.querySelectorAll('.js-square');

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
        });
        page.querySelector('.js-rotate-ship').addEventListener('click', () => {
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
                }
            }
        });
        page.querySelector('.js-unselect-ship').addEventListener(
            'click',
            (e) => {
                if (selectedShip !== null) {
                    selectedShip.classList.toggle('.selected');
                    selectedShip = null;
                    selectedShipText.textContent = 'No ship';
                    e.target.classList.toggle('disabled');
                }
            }
        );
        ships.forEach((ship) => {
            ship.addEventListener('click', (e) => {
                if (selectedShip !== e.target) {
                    if (selectedShip !== null) {
                        selectedShip.classList.toggle('.selected');
                    }
                    selectedShip = e.target;
                    e.target.classList.toggle('.selected');
                    selectedShipText.textContent =
                        e.target.dataset.name.charAt(0).toUpperCase() +
                        e.target.dataset.name.slice(1);
                    document
                        .querySelector('.js-unselect-ship')
                        .classList.toggle('disabled');
                }
            });
            ship.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('ship', e.target.id);
                if (selectedShip !== e.target) {
                    if (selectedShip !== null) {
                        selectedShip.classList.toggle('.selected');
                    }
                    selectedShip = e.target;
                    e.target.classList.toggle('.selected');
                    selectedShipText.textContent =
                        e.target.dataset.name.charAt(0).toUpperCase() +
                        e.target.dataset.name.slice(1);
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
                }
            }
        });
    }
}

export default EventCreator;
