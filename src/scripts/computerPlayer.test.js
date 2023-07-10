import ComputerPlayer from './computerPlayer';

test('Computer attacks another player', async () => {
    const mockPlayer = {
        receiveAttack: jest.fn().mockReturnValue({ isShip: false, x: 1, y: 1 }),
    };
    const mockAI = {
        generateMove: jest.fn().mockReturnValue([5, 4]),
    };
    const computer = new ComputerPlayer('computer', null, mockAI);
    await computer.attack(mockPlayer);
    expect(mockPlayer.receiveAttack).toHaveBeenCalledWith([5, 4]);
});

test('Computer sunken player ship and keep playing', async () => {
    const mockPlayer = {
        receiveAttack: jest
            .fn()
            .mockReturnValueOnce({ isShip: true, x: 0, y: 0 })
            .mockReturnValueOnce({ isShip: true, x: 0, y: 1, size: 2 })
            .mockReturnValue({ isShip: false, x: 5, y: 4 }),
    };
    const mockAI = {
        generateMove: jest
            .fn()
            .mockReturnValueOnce([0, 0])
            .mockReturnValueOnce([0, 1])
            .mockReturnValue([5, 4]),
    };
    const computer = new ComputerPlayer('computer', null, mockAI);
    await computer.attack(mockPlayer);
    await computer.attack(mockPlayer);
    await computer.attack(mockPlayer);
    expect(mockPlayer.receiveAttack).toHaveBeenLastCalledWith([5, 4]);
});