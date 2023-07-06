class DOMCreator {
    static createPage() {
        return new Range().createContextualFragment(`
            <header>
                <button class="js-reset-game"><h1>BATTLESHIP</h1></button>
                <button class="js-sound on">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Sound on</title>
                        <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Sound off</title>
                        <path d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                    </svg>
                </button>
            </header>
            <main>
                
            </main>
            <footer>
                <p class="footer-text">Created by <a src="https://github.com/wsfer">@wsfer</a></p>
                <section class="footer-links">
                    <a src="#">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>Linkedin</title>
                            <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                        </svg>
                    </a>
                    <a src="https://github.com/wsfer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>Github</title>
                            <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                        </svg>
                    </a>
                </section>
            </footer>
        `);
    }

    static createStartScreen() {
        return new Range().createContextualFragment(`
            <h1>BATTLESHIP<h1>
            <button class="js-new-game">New Game</button>
        `);
    }

    static createFleetScreen() {
        let board = '';

        for (let i = 0; i < 100; i++) {
            board += `<div class="square js-square" data-x="${Math.floor(
                i / 10
            )}" data-y="${i % 10}"></div>`;
        }

        return new Range().createContextualFragment(`
            <h2>Build your fleet</h2>
            <p>
                <span class="js-selected-ship">No ship</span> selected
            </p>
            <section>
                <section class="settings">
                    <button class="js-random-fleet">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>Random fleet</title>
                            <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15M17,5A2,2 0 0,0 15,7A2,2 0 0,0 17,9A2,2 0 0,0 19,7A2,2 0 0,0 17,5M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M7,15A2,2 0 0,0 5,17A2,2 0 0,0 7,19A2,2 0 0,0 9,17A2,2 0 0,0 7,15Z" />
                        </svg>
                    </button>
                    <button class="js-rotate-ship">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>Rotate Ship</title>
                            <path d="M12 7C6.5 7 2 9.2 2 12C2 14.2 4.9 16.1 9 16.8V20L13 16L9 12V14.7C5.8 14.1 4 12.8 4 12C4 10.9 7 9 12 9S20 10.9 20 12C20 12.7 18.5 13.9 16 14.5V16.6C19.5 15.8 22 14.1 22 12C22 9.2 17.5 7 12 7Z" />
                        </svg>
                    </button>
                    <button class="js-unselect-ship">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>Unselect</title>
                            <path d="M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z" />
                        </svg>
                    </button>
                </section>
                <section class="gameboard">
                    <div class="x-coords"></div>
                    <div class="y-coords"></div>
                    <div class="fleet js-fleet">
                        ${board}
                    </div>
                </section>
                <section class="ship-container js-ship-container">
                    <div id="destroyer" class="js-ship" draggable="true" data-direction="horizontal" data-name="destroyer" style="height: 3rem; width: 6rem; background-color: red"></div>
                    <div id="submarine" class="js-ship" draggable="true" data-direction="horizontal" data-name="submarine" style="height: 3rem; width: 9rem; background-color: red"></div>
                    <div id="cruiser" class="js-ship" draggable="true" data-direction="horizontal" data-name="cruiser" style="height: 3rem; width: 9rem; background-color: red"></div>
                    <div id="battleship" class="js-ship" draggable="true" data-direction="horizontal" data-name="battleship" style="height: 3rem; width: 12rem; background-color: red"></div>
                    <div id="carrier" class="js-ship" draggable="true" data-direction="horizontal" data-name="carrier" style="height: 3rem; width: 15rem; background-color: red"></div>
                </section>
            </section>
            <button class="js-start-game">Start Game</button>
        `);
    }

    static createGameScreen() {
        let board = '';

        for (let i = 0; i < 100; i++) {
            board += `<div class="square js-square" data-x="${Math.floor(
                i / 10
            )}" data-y="${i % 10}"></div>`;
        }

        return new Range().createContextualFragment(`
            <p>
                <span class="js-player-name-turn">Player</span> turn
            </p>
            <section>
                <section>
                    <h3><span>Player</span> fleet</h3>
                    <section>
                        <section class="js-player-fleet-status">
                            <div id="destroyer" class="js-ship-status"></div>
                            <div id="submarine" class="js-ship-status"></div>
                            <div id="cruiser" class="js-ship-status"></div>
                            <div id="battleship" class="js-ship-status"></div>
                            <div id="carrier" class="js-ship-status"></div>
                        </section>
                        <section class="gameboard">
                            <div class="x-coords"></div>
                            <div class="y-coords"></div>
                            <div class="fleet js-player-fleet">
                                ${board}
                            </div>
                        </section>
                    </section>
                </section>
                <section>
                    <h3><span>Computer</span> fleet</h3>
                    <section>
                        <section class="gameboard">
                            <div class="x-coords"></div>
                            <div class="y-coords"></div>
                            <div class="fleet js-computer-fleet">
                                ${board}
                            </div>
                        </section>
                        <section class="js-computer-fleet-status">
                            <div id="destroyer" class="js-ship-status"></div>
                            <div id="submarine" class="js-ship-status"></div>
                            <div id="cruiser" class="js-ship-status"></div>
                            <div id="battleship" class="js-ship-status"></div>
                            <div id="carrier" class="js-ship-status"></div>
                        </section>
                    </section>
                </section>
            </section>
            <p class="js-combat-log">Attack!</p>
            <section class="js-gameover-box">
                <h3><span class="js-winner"></span> won the game</h3>
                <button class="js-restart-game">Play again</button>
            </section>
        `);
    }
}

export default DOMCreator;
