import './main.scss';
import AudioController from './scripts/audioController';
import DOMCreator from './scripts/DOMCreator';
import EventCreator from './scripts/eventCreator';
import FleetBuilder from './scripts/fleetBuilder';
import Gameboard from './scripts/gameboard';
import Player from './scripts/player';
import ComputerPlayer from './scripts/computerPlayer';
import ComputerAI from './scripts/computerAI';
import GameController from './scripts/gameController';

const audio = new AudioController();

const startGame = function initializePagesAndObjects() {
    const startScreen = DOMCreator.createStartScreen();
    const fleetScreen = DOMCreator.createFleetScreen();
    const gameScreen = DOMCreator.createGameScreen();

    const playerFleet = new FleetBuilder();
    const computerFleet = new FleetBuilder();
    let playerBoard = null;
    let computerBoard = null;
    let player = null;
    let computer = null;
    let game = null;

    startScreen.querySelector('.js-new-game').addEventListener('click', () => {
        document.querySelector('main').textContent = '';

        // Initialize computer player
        computerFleet.generateRandomFleet();
        computerBoard = new Gameboard(computerFleet.getFleet());
        computer = new ComputerPlayer('Computer', computerBoard, ComputerAI);

        EventCreator.addFleetScreenEvents(fleetScreen, playerFleet);
        document.querySelector('main').appendChild(fleetScreen);
    });

    fleetScreen
        .querySelector('.js-start-game')
        .addEventListener('click', () => {
            if (playerFleet.isDone()) {
                document.querySelector('main').textContent = '';
                playerBoard = new Gameboard(playerFleet.getFleet());
                player = new Player('Player', playerBoard);
                game = new GameController(player, computer);
                EventCreator.addGameScreenEvents(gameScreen, game, audio);
                document.querySelector('main').appendChild(gameScreen);
            }
        });

    gameScreen
        .querySelector('.js-restart-game')
        .addEventListener('click', () => {
            document.body.classList.toggle('gameover');
            startGame();
        });

    document.querySelector('main').textContent = '';
    document.querySelector('main').appendChild(startScreen);
};

const page = DOMCreator.createPage(audio);

page.querySelector('.js-reset-game').addEventListener('click', startGame);
page.querySelector('.js-sound').addEventListener('click', (e) => {
    document.querySelector('.js-sound').classList.toggle('on');
    audio.toggle();
});

document.body.appendChild(page);
startGame();

audio
    .playMusic()
    .then(() => console.log('Music on'))
    .catch(() => {
        console.log('Music off');
        document.querySelector('.js-sound').classList.toggle('on');
        audio.toggle();
    });
