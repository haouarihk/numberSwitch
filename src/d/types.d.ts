

export type MatrixItemType = number;

export type MatrixRow = MatrixItemType[]


export interface Item {
    pos: {
        top: number;
        left: number;
    };
    slot: {
        x: number;
        y: number;
    }
    name: string;
    clickable: boolean;
}


export type DBType = {
    [diff: number]: {
        [name: string]: ({
            score: number, moves: number; date: number
        }[])
    }
}