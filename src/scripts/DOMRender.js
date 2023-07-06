import DOMCreator from './DOMCreator';
import EventCreator from './eventCreator';
import FleetBuilder from './fleetBuilder';

class DOMRender {
    // Called once per page load
    static renderPage(music) {
        const page = DOMCreator.createPage();

        page.querySelector('.js-reset-game').addEventListener('click', () => {
            this.renderStartPage();
        });
        page.querySelector('.js-sound').addEventListener('click', (e) => {
            e.target.classList.toggle('on');
            music.muted = !music.muted;
        });

        document.body.appendChild(page);
    }

    static renderStartScreen() {
        const page = DOMCreator.createStartScreen();

        page.querySelector('.js-new-game').addEventListener('click', () => {
            this.renderFleetScreen();
        });

        document.querySelector('main').textContent = '';
        document.querySelector('main').appendChild(page);
    }

    static renderFleetScreen() {
        const playerFleet = new FleetBuilder();
        const page = DOMCreator.createFleetScreen();
        EventCreator.addFleetScreenEvents(page, playerFleet);

        page.querySelector('.js-start-game').addEventListener('click', () => {
            if (playerFleet.isDone()) {
                const computerFleet = new FleetBuilder();
                computerFleet.generateRandomFleet();
                this.renderGameScreen(playerFleet, computerFleet);
            }
        });

        document.querySelector('main').textContent = '';
        document.querySelector('main').appendChild(page);
    }

    static renderGameScreen(playerFleet, computerFleet) {
        const page = DOMCreator.createGameScreen();
        EventCreator.addGameScreenEvents(
            page,
            playerFleet,
            computerFleet,
            this.renderGameOverBox
        );
        document.querySelector('main').textContent = '';
        document.querySelector('main').appendChild(page);
    }

    static renderGameOverBox(winner) {
        const screen = DOMCreator.createGameOverScreen(winner);

        screen.querySelector('.js-restart').addEventListener('click', () => {
            this.renderStartScreen();
            document.body.classList.toggle('popup');
            const box = document.querySelector('.js-popup-box');
            document.body.removeChild(box);
        });

        document.body.classList.toggle('popup');
        document.body.appendChild(screen);
    }
}

export default DOMRender;
