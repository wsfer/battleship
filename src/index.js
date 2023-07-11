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
    const fleetScreenOne = DOMCreator.createFleetScreen();
    const fleetScreenTwo = DOMCreator.createFleetScreen();
    const gameScreen = DOMCreator.createGameScreen();

    const playerOneFleet = new FleetBuilder();
    const playerTwoFleet = new FleetBuilder();
    let playerOneBoard = null;
    let playerTwoBoard = null;
    let playerOne = null;
    let playerTwo = null;
    let game = null;

    fleetScreenOne.querySelector('.js-player-name').value = 'PlayerOne';
    fleetScreenTwo.querySelector('.js-player-name').value = 'PlayerTwo';

    startScreen
        .querySelector('.js-player-vs-computer')
        .addEventListener('click', () => {
            document.querySelector('main').textContent = '';
            document.querySelector('.js-reset-game').style.display = 'block';

            // Initialize computer player
            playerTwoFleet.generateRandomFleet();
            playerTwoBoard = new Gameboard(playerTwoFleet.getFleet());
            playerTwo = new ComputerPlayer(
                'Computer',
                playerTwoBoard,
                ComputerAI
            );

            EventCreator.addFleetScreenEvents(fleetScreenOne, playerOneFleet);
            document.querySelector('main').appendChild(fleetScreenOne);
        });

    startScreen
        .querySelector('.js-player-vs-player')
        .addEventListener('click', () => {
            document.querySelector('main').textContent = '';
            document.querySelector('.js-reset-game').style.display = 'block';
            EventCreator.addFleetScreenEvents(fleetScreenTwo, playerTwoFleet);
            document.querySelector('main').appendChild(fleetScreenTwo);
        });

    fleetScreenOne
        .querySelector('.js-start-game')
        .addEventListener('click', () => {
            const playerName = document.querySelector('.js-player-name');
            if (playerOneFleet.isDone() && playerName.value !== '') {
                document.querySelector('main').textContent = '';

                playerOneBoard = new Gameboard(playerOneFleet.getFleet());
                playerOne = new Player(playerName.value, playerOneBoard);
                game = new GameController(playerOne, playerTwo);

                gameScreen.querySelector('.js-player-name-turn').textContent =
                    playerOne.name;
                gameScreen.querySelector('.js-player-one-name').textContent =
                    playerOne.name;

                EventCreator.addGameScreenEvents(gameScreen, game, audio);
                document.querySelector('main').appendChild(gameScreen);
            }
        });

    // Only used on player vs player
    fleetScreenTwo
        .querySelector('.js-start-game')
        .addEventListener('click', () => {
            const playerName = document.querySelector('.js-player-name');
            if (playerTwoFleet.isDone() && playerName.value !== '') {
                document.querySelector('main').textContent = '';

                playerTwoBoard = new Gameboard(playerTwoFleet.getFleet());
                playerTwo = new Player(playerName.value, playerTwoBoard);
                gameScreen.querySelector('.js-player-two-name').textContent =
                    playerTwo.name;

                EventCreator.addFleetScreenEvents(
                    fleetScreenOne,
                    playerOneFleet
                );
                document.querySelector('main').appendChild(fleetScreenOne);
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
