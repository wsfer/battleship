import DOMCreator from './DOMCreator';
import EventCreator from './eventCreator';
import FleetBuilder from './fleetBuilder';

class DOMRender {
    static renderStartPage(music) {
        document.body.textContent = '';
        const page = DOMCreator.createStartPage();
        EventCreator.addStartPageEvents(page, music);

        page.querySelector('.js-new-game').addEventListener('click', () => {
            this.renderFleetPage(music);
        });

        document.body.appendChild(page);
    }

    static renderFleetPage = (music) => {
        document.body.textContent = '';
        const fleetBuilder = new FleetBuilder();
        const page = DOMCreator.createFleetPage();
        EventCreator.addFleetPageEvents(page, music, fleetBuilder);

        page.querySelector('.js-reset-game').addEventListener('click', () => {
            this.renderStartPage(music);
        });
        page.querySelector('.js-start-game').addEventListener('click', () => {
            this.renderGamePage(music, fleetBuilder);
        });

        document.body.appendChild(page);
    };

    static renderGamePage = (music, fleetBuilder) => {
        document.body.textContent = '';
        const page = DOMCreator.createGamePage();
        EventCreator.addGamePageEvents(page, music);

        page.querySelector('.js-reset-game').addEventListener('click', () => {
            this.renderStartPage(music);
        });

        document.body.appendChild(page);
    };
}

export default DOMRender;
