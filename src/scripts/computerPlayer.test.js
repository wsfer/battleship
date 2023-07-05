import ComputerPlayer from './computerPlayer';

test('Computer attacks another player', () => {
    const mockPlayer = {
        receiveAttack: jest.fn().mockReturnValue({ isShip: false, x: 1, y: 1 }),
    };
    const computer = new ComputerPlayer('computer', null);
    computer.attack(mockPlayer);
    expect(mockPlayer.receiveAttack).toHaveBeenCalled();
});
