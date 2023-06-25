import Ship from './ship';

test('Create a ship', () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.isSunk()).toBeFalsy;
});

test('Hit a ship', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
    expect(ship.isSunk()).toBeFalsy;
});

test('Sunken a ship', () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy;
});
