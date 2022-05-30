import type { MatrixItemType, MatrixRow } from "src/d/types";
export class Grid {
    grid: MatrixRow[];
    readonly items: MatrixItemType[];
    readonly width: number;
    readonly height: number;

    constructor(
        items: MatrixItemType[],
        width: number = 3,
        height: number = 3,
    ) {
        this.items = items;
        this.grid = [];
        this.width = width;
        this.height = height;
    }

    makeGrid() {
        this.grid = [];
        for (let i = 0; i < this.width; i++) {
            this.grid.push([]);
            for (let j = 0; j < this.height; j++) {
                this.grid[i].push(this.items[i * this.width + j]);
            }
        }
    }

    randomize(steps: number = 3) {
        this.makeGrid();
        for (let counter = 0; counter < steps; counter++)
            this.move(this.getRandomMove());
    }

    move(pos1: { x: number; y: number }) {
        const to = this.findTheEmptySpot();
        if (pos1.x == to.x && pos1.y == to.y) return;
        let temp = this.grid[pos1.x][pos1.y];
        this.grid[pos1.x][pos1.y] = this.grid[to.x][to.y];
        this.grid[to.x][to.y] = temp;
        this.grid = [...this.grid]; // to trigger refresh
    }

    getAvailableMoveSlots() {
        let cords = this.findTheEmptySpot();
        const moves = [
            { x: cords.x - 1, y: cords.y },
            { x: cords.x + 1, y: cords.y },
            { x: cords.x, y: cords.y - 1 },
            { x: cords.x, y: cords.y + 1 },
        ]

        return moves.filter(m => m.x >= 0 && m.x < this.grid.length && m.y >= 0 && m.y < this.grid[m.x].length);
    }

    getRandomMove(): { x: number, y: number } {
        const availableMoves = this.getAvailableMoveSlots()
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    getMovementDirectionFromPoint(x: number, y: number) {
        const cords = this.findTheEmptySpot();
        if (x === cords.x) return y < cords.y ? 'right' : 'left';
        if (y === cords.y) return x < cords.x ? 'down' : 'up';
        return undefined;
    }

    find(val: MatrixItemType | undefined) {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j] === val) {
                    return { x: i, y: j };
                }
            }
        }
        return { x: -1, y: -1 };
    }

    findTheEmptySpot() {
        return this.find(undefined)
    }

    isAvailableMove(x: number, y: number) {
        return this.getAvailableMoveSlots().some(m => m.x === x && m.y === y);
    }

    checkOrder(): boolean {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j] !== undefined && this.grid[i][j] !== i * this.width + j + 1) {
                    return false;
                }
            }
        }
        return true;
    }
}