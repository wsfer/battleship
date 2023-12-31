import GameController from './gameController';

const mockDOMElement = function DOMElementFactory() {
    const elementClasses = new Set();
    const add = (name) => elementClasses.add(name);
    const remove = (name) => elementClasses.delete(name);
    const contains = (name) => elementClasses.has(name);
    const toggle = (name) =>
        elementClasses.has(name)
            ? elementClasses.delete(name)
            : elementClasses.add(name);

    return {
        textContent: '',
        classList: { add, remove, contains, toggle },
        style: { backgroundImage: '' },
    };
};

let player1;
let player2;
let DOMContent;

beforeEach(() => {
    player1 = {
        name: 'Player_one',
        attack(player, coords) {
            return player.receiveAttack(coords);
        },
        receiveAttack: jest.fn().mockReturnValue({
            target: 'Destroyer',
            size: 2,
            health: 1,
            x: 5,
            y: 0,
            isShip: true,
            gameover: false,
        }),
    };

    player2 = {
        name: 'SeCoNd_PlAyEr',
        attack(player, coords) {
            return player.receiveAttack(coords);
        },
        receiveAttack: jest
            .fn()
            .mockReturnValueOnce({
                target: 'Water',
                x: 8,
                y: 1,
                isShip: false,
                gameover: false,
            })
            .mockReturnValue({
                target: 'Carrier',
                size: 5,
                health: 4,
                x: 1,
                y: 1,
                isShip: true,
                gameover: true,
            }),
    };

    const squares1 = [[], [], [], [], [], [], [], [], [], []];
    const squares2 = [[], [], [], [], [], [], [], [], [], []];

    squares1[5][0] = mockDOMElement();
    squares2[8][1] = mockDOMElement();
    squares2[1][1] = mockDOMElement();

    DOMContent = {
        combatLog: mockDOMElement(),
        nextPlayer: mockDOMElement(),
        winnerName: mockDOMElement(),
        playerOneSquares: squares1,
        playerTwoSquares: squares2,
        playerOneShips: {
            destroyer: mockDOMElement(),
            submarine: mockDOMElement(),
            cruiser: mockDOMElement(),
            battleship: mockDOMElement(),
            carrier: mockDOMElement(),
        },
        playerTwoShips: {
            destroyer: mockDOMElement(),
            submarine: mockDOMElement(),
            cruiser: mockDOMElement(),
            battleship: mockDOMElement(),
            carrier: mockDOMElement(),
        },
    };
});

test('Pass turns', () => {
    const game = new GameController(player1, player2, DOMContent);
    expect(game.nextPlayer).toBe(player1);
    const turn = game.play([9, 9]);
    expect(game.nextPlayer).toBe(player2);
    const newTurn = game.play(null);
    expect(game.nextPlayer).toBe(player1);
});

test('Returns correct values', () => {
    const game = new GameController(player1, player2, DOMContent);
    const turn = game.play([8, 1]);
    expect(turn).toEqual({
        attacker: 'Player_one',
        defender: 'SeCoNd_PlAyEr',
        target: 'Water',
        x: 8,
        y: 1,
        isShip: false,
        gameover: false,
    });

    const newTurn = game.play(null);
    expect(newTurn).toEqual({
        attacker: 'SeCoNd_PlAyEr',
        defender: 'Player_one',
        target: 'Destroyer',
        size: 2,
        health: 1,
        x: 5,
        y: 0,
        isShip: true,
        gameover: false,
    });

    const lastTurn = game.play(null);
    expect(lastTurn).toEqual({
        attacker: 'Player_one',
        defender: 'SeCoNd_PlAyEr',
        target: 'Carrier',
        size: 5,
        health: 4,
        x: 1,
        y: 1,
        isShip: true,
        gameover: true,
    });
});

test('Changes DOM content correctly', () => {
    const game = new GameController(player1, player2, DOMContent);

    expect(DOMContent.nextPlayer.textContent).toBe('Player_one');

    game.play([8, 1]);
    expect(DOMContent.combatLog.textContent).toBe(
        "Player_one attacked SeCoNd_PlAyEr's Water"
    );
    expect(DOMContent.nextPlayer.textContent).toBe('SeCoNd_PlAyEr');
    expect(DOMContent.winnerName.textContent).toBe('');
    expect(DOMContent.playerTwoSquares[8][1].classList.contains('water'))
        .toBeTruthy;

    game.play(null);

    expect(DOMContent.combatLog.textContent).toBe(
        "SeCoNd_PlAyEr attacked Player_one's Destroyer"
    );
    expect(DOMContent.nextPlayer.textContent).toBe('Player_one');
    expect(DOMContent.winnerName.textContent).toBe('');
    expect(DOMContent.playerOneSquares[5][0].classList.contains('sunken'))
        .toBeTruthy;
    expect(DOMContent.playerOneShips.destroyer.style.backgroundImage).toBe(
        'linear-gradient(to left, var(--secondary) 0 50%, var(--light-opaque) 50% 100%)'
    );

    game.play('anything');

    expect(DOMContent.combatLog.textContent).toBe(
        "Player_one attacked SeCoNd_PlAyEr's Carrier"
    );
    expect(DOMContent.nextPlayer.textContent).toBe('SeCoNd_PlAyEr');
    expect(DOMContent.winnerName.textContent).toBe('Player_one');
    expect(DOMContent.playerTwoSquares[1][1].classList.contains('sunken'))
        .toBeTruthy;
    expect(DOMContent.playerTwoShips.carrier.style.backgroundImage).toBe(
        'linear-gradient(to right, var(--secondary) 0 80%, var(--light-opaque) 80% 100%)'
    );
});
