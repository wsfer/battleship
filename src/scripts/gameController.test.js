import GameController from './gameController';

test('Returns correct values and pass turns', async () => {
    const player1 = {
        name: 'Player_one',
        attack(player, coords) {
            return player.receiveAttack(coords);
        },
        receiveAttack: jest.fn().mockReturnValue({ infos: 'Player1 attacked' }),
    };

    const player2 = {
        name: 'SeCoNd_PlAyEr',
        attack(player, coords) {
            return player.receiveAttack(coords);
        },
        receiveAttack: jest.fn().mockReturnValue({ infos: 'Player2 attacked' }),
    };

    const game = new GameController(player1, player2);
    const turn = await game.play([3, 4]);

    expect(turn).toEqual({
        attacker: 'Player_one',
        defender: 'SeCoNd_PlAyEr',
        infos: 'Player2 attacked',
    });
    expect(game.nextPlayer).toBe(player2);

    const newTurn = await game.play(null);

    expect(newTurn).toEqual({
        attacker: 'SeCoNd_PlAyEr',
        defender: 'Player_one',
        infos: 'Player1 attacked',
    });
    expect(game.nextPlayer).toBe(player1);
});
