import Player from './player';

test.only('One player atakes another player', () => {
    const fleet1 = {
        receiveAttack: jest.fn().mockReturnValue({ gameover: false }),
    };

    const fleet2 = {
        receiveAttack: jest
            .fn()
            .mockReturnValueOnce({ gameover: false })
            .mockReturnValue({ gameover: true }),
    };

    const player1 = new Player(fleet1);
    const player2 = new Player(fleet2);

    const turn1 = player1.attack(player2);
    const turn2 = player2.attack(player1);
    const turn3 = player1.attack(player2);

    expect(turn1.gameover).toBeFalsy;
    expect(turn2.gameover).toBeFalsy;
    expect(turn3.gameover).toBeTruthy;

    expect(fleet1.receiveAttack).toHaveBeenCalled();
    expect(fleet2.receiveAttack).toHaveBeenCalled();
});
