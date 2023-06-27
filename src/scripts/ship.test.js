import Ship from './ship';

test('Create a ship', () => {
    const ship = new Ship(3, 'submarine');

    expect(ship.length).toBe(3);
    expect(ship.health).toBe(3);
    expect(ship.isSunk()).toBeFalsy;
});

test('Hit a ship', () => {
    const ship = new Ship(3, 'cruiser');
    const attack = ship.hit();

    expect(ship.health).toBe(2);
    expect(ship.isSunk()).toBeFalsy;
    expect(attack).toEqual({
        target: 'cruiser',
        length: 3,
        health: 2,
    });
});

test('Sunken a ship', () => {
    const ship = new Ship(1, 'ship');
    const attack = ship.hit();

    expect(ship.health).toBe(0);
    expect(ship.isSunk()).toBeTruthy;
    expect(attack).toEqual({
        target: 'ship',
        length: 1,
        health: 0,
    });
});

test('Create a sunken ship', () => {
    const ship = new Ship(0, 'sunken');
    const attack = ship.hit();

    expect(ship.health).toBe(0);
    expect(ship.isSunk()).toBeTruthy;
    expect(attack).toEqual({
        target: 'sunken',
        length: 0,
        health: 0,
    });
});
