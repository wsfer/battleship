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

import music from './assets/war-is-coming.mp3';
import explosion from './assets/explosion.mp3';
import splash from './assets/splash.mp3';

const audio = new AudioController(music, explosion, splash);

const startGame = function initializePagesAndObjects() {
    document.querySelector('.js-reset-game').style.display = 'none';

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
        document.querySelector('.js-reset-game').style.display = 'block';

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
            document.body.classList.toggle('popup');
            startGame();
        });

    document.querySelector('main').textContent = '';
    document.querySelector('main').appendChild(startScreen);
};

const page = DOMCreator.createPage(audio);

page.querySelector('.js-reset-game').addEventListener('click', startGame);
page.querySelector('.js-sound').addEventListener('click', () => {
    document.querySelector('.js-sound').classList.toggle('on');
    const muted = audio.toggle();
    if (!muted) {
        audio.playMusic();
    }
});

document.body.appendChild(page);
startGame();

audio.playMusic().catch(() => {
    document.body.classList.toggle('popup');
    document.querySelector('.js-allow-sound').addEventListener('click', () => {
        document.body.classList.toggle('popup');
        audio.playMusic();
    });
    document.querySelector('.js-refuse-sound').addEventListener('click', () => {
        document.body.classList.toggle('popup');
        document.querySelector('.js-sound').classList.toggle('on');
        audio.toggle();
    });
});
