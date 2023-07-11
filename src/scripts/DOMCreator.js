class DOMCreator {
    static createPage() {
        return new Range().createContextualFragment(`
            <header>
                <button class="reset-button js-reset-game">BATTLESHIP</button>
                <button class="svg-button sound-button js-sound on">
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
                    <a href="#" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>Linkedin</title>
                            <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                        </svg>
                    </a>
                    <a href="https://github.com/wsfer" target="_blank">
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
            <h1 class="game-title">BATTLESHIP</h1>
            <div class="buttons-container">
                <button class="text-button js-player-vs-computer">Player vs Computer</button>
                <button class="text-button js-player-vs-player">Player vs Player</button>
            </div>
            <section class="popup-box js-sound-box">
                <p>Allow sound?</p>
                <div>
                    <button class="solid-button js-allow-sound">Allow</button>
                    <button class="solid-button js-refuse-sound">Refuse</button>
                </div>
            </section>
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
            <div class="player-name-input">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>Drawing Pen</title>
                    <path d="M9.75 20.85C11.53 20.15 11.14 18.22 10.24 17C9.35 15.75 8.12 14.89 6.88 14.06C6 13.5 5.19 12.8 4.54 12C4.26 11.67 3.69 11.06 4.27 10.94C4.86 10.82 5.88 11.4 6.4 11.62C7.31 12 8.21 12.44 9.05 12.96L10.06 11.26C8.5 10.23 6.5 9.32 4.64 9.05C3.58 8.89 2.46 9.11 2.1 10.26C1.78 11.25 2.29 12.25 2.87 13.03C4.24 14.86 6.37 15.74 7.96 17.32C8.3 17.65 8.71 18.04 8.91 18.5C9.12 18.94 9.07 18.97 8.6 18.97C7.36 18.97 5.81 18 4.8 17.36L3.79 19.06C5.32 20 7.88 21.47 9.75 20.85M18.96 7.33L13.29 13H11V10.71L16.67 5.03L18.96 7.33M22.36 6.55C22.35 6.85 22.04 7.16 21.72 7.47L19.2 10L18.33 9.13L20.93 6.54L20.34 5.95L19.67 6.62L17.38 4.33L19.53 2.18C19.77 1.94 20.16 1.94 20.39 2.18L21.82 3.61C22.06 3.83 22.06 4.23 21.82 4.47C21.61 4.68 21.41 4.88 21.41 5.08C21.39 5.28 21.59 5.5 21.79 5.67C22.08 5.97 22.37 6.25 22.36 6.55Z" />
                </svg>
                <label for="name">Your name:</label>
                <input id="name" class="js-player-name" type="text" maxlength="12" required>
                <p class="invalid-input-message">Name is required</p>
            </div>
            <h2>Build your fleet</h2>
            <p>
                <span class="js-selected-ship">No ship</span> selected
            </p>
            <section class="fleet-builder">
                <div class="fleet-container">
                    <section class="settings">
                        <button class="svg-button js-random-fleet">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>Random fleet</title>
                                <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15M17,5A2,2 0 0,0 15,7A2,2 0 0,0 17,9A2,2 0 0,0 19,7A2,2 0 0,0 17,5M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M7,15A2,2 0 0,0 5,17A2,2 0 0,0 7,19A2,2 0 0,0 9,17A2,2 0 0,0 7,15Z" />
                            </svg>
                        </button>
                        <button class="svg-button js-rotate-ship" disabled>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>Rotate Ship</title>
                                <path d="M12 7C6.5 7 2 9.2 2 12C2 14.2 4.9 16.1 9 16.8V20L13 16L9 12V14.7C5.8 14.1 4 12.8 4 12C4 10.9 7 9 12 9S20 10.9 20 12C20 12.7 18.5 13.9 16 14.5V16.6C19.5 15.8 22 14.1 22 12C22 9.2 17.5 7 12 7Z" />
                            </svg>
                        </button>
                        <button class="svg-button js-unselect-ship" disabled>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>Unselect</title>
                                <path d="M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z" />
                            </svg>
                        </button>
                    </section>
                    <section class="gameboard">
                        <div class="x-coords">
                            <div>A</div>
                            <div>B</div>
                            <div>C</div>
                            <div>D</div>
                            <div>E</div>
                            <div>F</div>
                            <div>G</div>
                            <div>H</div>
                            <div>I</div>
                            <div>J</div>
                        </div>
                        <div class="y-coords">
                            <div>1</div>
                            <div>2</div>
                            <div>3</div>
                            <div>4</div>
                            <div>5</div>
                            <div>6</div>
                            <div>7</div>
                            <div>8</div>
                            <div>9</div>
                            <div>10</div>
                        </div>
                        <div class="fleet js-fleet">
                            ${board}
                        </div>
                    </section>
                <section class="ship-dock js-ship-dock">
                    <div id="destroyer" class="destroyer ship js-ship" draggable="true"
                        data-direction="horizontal" data-name="destroyer"
                        style="height: clamp(1rem, 5vw, 2.5rem); width: clamp(2rem, 10vw, 5rem);">
                    </div>
                    <div id="submarine" class="submarine ship js-ship" draggable="true"
                        data-direction="horizontal" data-name="submarine"
                        style="height: clamp(1rem, 5vw, 2.5rem); width: clamp(3rem, 15vw, 7.5rem);">
                    </div>
                    <div id="cruiser" class="cruiser ship js-ship" draggable="true"
                        data-direction="horizontal" data-name="cruiser"
                        style="height: clamp(1rem, 5vw, 2.5rem); width: clamp(3rem, 15vw, 7.5rem);">
                    </div>
                    <div id="battleship" class="battleship ship js-ship" draggable="true"
                        data-direction="horizontal" data-name="battleship"
                        style="height: clamp(1rem, 5vw, 2.5rem); width: clamp(4rem, 20vw, 10rem);">
                    </div>
                    <div id="carrier" class="carrier ship js-ship" draggable="true"
                        data-direction="horizontal" data-name="carrier"
                        style="height: clamp(1rem, 5vw, 2.5rem); width: clamp(5rem, 25vw, 12.5rem);">
                    </div>
                </section>
            </section>
            <button class="solid-button js-start-game" disabled>Start Game</button>
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
                <span class="js-player-name-turn action-text"></span> turn
            </p>
            <section class="player-boards-container">
                <section class="board-container">
                    <section class="fleet-status player-one">
                        <div class="ship-health destroyer js-player-destroyer"></div>
                        <div class="ship-health submarine js-player-submarine"></div>
                        <div class="ship-health cruiser js-player-cruiser"></div>
                        <div class="ship-health battleship js-player-battleship"></div>
                        <div class="ship-health carrier js-player-carrier"></div>
                    </section>
                    <div class="fleet-container">
                        <h3 class="board-title"><span class="js-player-one-name"></span> fleet</h3>
                        <section class="gameboard">
                            <div class="x-coords">
                                <div>A</div>
                                <div>B</div>
                                <div>C</div>
                                <div>D</div>
                                <div>E</div>
                                <div>F</div>
                                <div>G</div>
                                <div>H</div>
                                <div>I</div>
                                <div>J</div>
                            </div>
                            <div class="y-coords">
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                                <div>4</div>
                                <div>5</div>
                                <div>6</div>
                                <div>7</div>
                                <div>8</div>
                                <div>9</div>
                                <div>10</div>
                            </div>
                            <div class="fleet js-player-fleet disabled">
                                ${board}
                            </div>
                        </section>
                    </div>
                </section>
                <section class="board-container">
                    <div class="fleet-container">
                        <h3 class="board-title"><span class="js-player-two-name"></span> fleet</h3>
                        <section class="gameboard">
                            <div class="x-coords">
                                <div>A</div>
                                <div>B</div>
                                <div>C</div>
                                <div>D</div>
                                <div>E</div>
                                <div>F</div>
                                <div>G</div>
                                <div>H</div>
                                <div>I</div>
                                <div>J</div>
                            </div>
                            <div class="y-coords">
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                                <div>4</div>
                                <div>5</div>
                                <div>6</div>
                                <div>7</div>
                                <div>8</div>
                                <div>9</div>
                                <div>10</div>
                            </div>
                            <div class="fleet js-computer-fleet">
                                ${board}
                            </div>
                        </section>
                    </div>
                    <section class="fleet-status player-two">
                        <div class="ship-health destroyer js-computer-destroyer"></div>
                        <div class="ship-health submarine js-computer-submarine"></div>
                        <div class="ship-health cruiser js-computer-cruiser"></div>
                        <div class="ship-health battleship js-computer-battleship"></div>
                        <div class="ship-health carrier js-computer-carrier"></div>
                    </section>
                </section>
            </section>
            <p class="action-text js-combat-log">Attack!</p>
            <section class="popup-box js-gameover-box">
                <h3><span class="action-text js-winner"></span> won the game</h3>
                <button class="solid-button js-restart-game">Play again</button>
            </section>
        `);
    }
}

export default DOMCreator;
