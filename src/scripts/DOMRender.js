import DOMCreator from './DOMCreator';
import EventCreator from './eventCreator';
import FleetBuilder from './fleetBuilder';

class DOMRender {
    static renderStartPage(music) {
        const page = DOMCreator.createStartPage();
        EventCreator.addStartPageEvents(page, music);

        page.querySelector('.js-reset-game').addEventListener('click', () => {
            this.renderStartPage(music);
        });
        page.querySelector('.js-new-game').addEventListener('click', () => {
            this.renderFleetPage();
        });

        document.body.textContent = '';
        document.body.appendChild(page);
    }

    static renderFleetPage = () => {
        const playerFleet = new FleetBuilder();
        const page = DOMCreator.createFleetPage();
        EventCreator.addFleetPageEvents(page, playerFleet);

        page.querySelector('.js-start-game').addEventListener('click', () => {
            if (playerFleet.isDone()) {
                const computerFleet = new FleetBuilder();
                computerFleet.generateRandomFleet();
                this.renderGamePage(playerFleet, computerFleet);
            }
        });

        document.querySelector('main').textContent = '';
        document.querySelector('main').appendChild(page);
    };

    static renderGamePage = (playerFleet, computerFleet) => {
        const page = DOMCreator.createGamePage();
        EventCreator.addGamePageEvents(page, playerFleet, computerFleet);
        document.querySelector('main').textContent = '';
        document.querySelector('main').appendChild(page);
    };
}

export default DOMRender;
