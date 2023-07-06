class ComputerAI {
    static async generateMove(availableCoords, targetingShip) {
        // No ship being targeted: return a random coord
        if (targetingShip === null) {
            // await new Promise((resolve) => {
            //     setTimeout(resolve, Math.random() * 1000);
            // });
            return this.#getRandomCoord(availableCoords);
        }

        // Ship has only one discovered position: return one valid random adjacent coord
        if (targetingShip.positions.length === 1) {
            const position = targetingShip.positions[0];

            // await new Promise((resolve) => {
            //     setTimeout(resolve, Math.random() * 1000);
            // });

            return this.#getRandomAdjacentCoord(availableCoords, position);
        }

        // Ship has a discovered direction
        // await new Promise((resolve) => {
        //     setTimeout(resolve, Math.random() * 1000);
        // });

        return this.#getRandomEdgeCoord(
            availableCoords,
            targetingShip.direction,
            targetingShip.positions
        );
    }

    static #getRandomCoord(availableCoords) {
        const coords = availableCoords.filter(
            (row) => row.filter((col) => col).length > 0
        );
        const randomRow = coords[
            Math.floor(Math.random() * coords.length)
        ].filter((coord) => coord !== null);
        return randomRow[Math.floor(Math.random() * randomRow.length)];
    }

    static #getRandomAdjacentCoord(availableCoords, [Cx, Cy]) {
        const adjacents = [
            [Cx + 1, Cy],
            [Cx, Cy - 1],
            [Cx, Cy + 1],
            [Cx - 1, Cy],
        ].filter(
            ([x, y]) =>
                x >= 0 &&
                x < 10 &&
                y >= 0 &&
                y < 10 &&
                availableCoords[x][y] !== null
        );
        return adjacents[Math.floor(Math.random() * adjacents.length)];
    }

    static #getRandomEdgeCoord(availableCoords, direction, positions) {
        let edges;

        if (direction === 'horizontal') {
            const coordX = positions[0][0];
            const allY = positions.map(([x, y]) => y);
            edges = [
                [coordX, Math.min(...allY) - 1],
                [coordX, Math.max(...allY) + 1],
            ].filter(
                ([x, y]) => y >= 0 && y < 10 && availableCoords[x][y] !== null
            );
        }

        if (direction === 'vertical') {
            const coordY = positions[0][1];
            const allX = positions.map(([x, y]) => x);
            edges = [
                [Math.min(...allX) - 1, coordY],
                [Math.max(...allX) + 1, coordY],
            ].filter(
                ([x, y]) => x >= 0 && x < 10 && availableCoords[x][y] !== null
            );
        }
        return edges[Math.floor(Math.random() * edges.length)];
    }
}

export default ComputerAI;
