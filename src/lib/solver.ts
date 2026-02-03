import type { Grid, CellValue } from '../types';

const SIZE = 9;
const BLOCK = 3;

function isValid(
    grid: Grid,
    row: number,
    col: number,
    num: CellValue
): boolean {
    if (num === null) return true;
    for (let i = 0; i < SIZE; i++) {
        if (grid[row][i] === num && i !== col) return false;
        if (grid[i][col] === num && i !== row) return false;
    }
    const br = Math.floor(row / BLOCK) * BLOCK;
    const bc = Math.floor(col / BLOCK) * BLOCK;
    for (let r = br; r < br + BLOCK; r++) {
        for (let c = bc; c < bc + BLOCK; c++) {
            if ((r !== row || c !== col) && grid[r][c] === num) return false;
        }
    }
    return true;
}

/** Reject invalid puzzles (duplicate in row/col/block) before backtracking. */
function isValidPartialGrid(grid: Grid): boolean {
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            const num = grid[row][col];
            if (num === null) continue;
            if (!isValid(grid, row, col, num)) return false;
        }
    }
    return true;
}

/** True if the next empty cell (in row-major order) has at least one valid option. */
function nextEmptyCellHasOption(
    grid: Grid,
    startRow: number,
    startCol: number
): boolean {
    let r = startRow;
    let c = startCol;
    while (r < SIZE) {
        if (grid[r][c] === null) {
            for (let num = 1; num <= SIZE; num++) {
                if (isValid(grid, r, c, num as NonNullable<CellValue>))
                    return true;
            }
            return false;
        }
        c++;
        if (c === SIZE) {
            c = 0;
            r++;
        }
    }
    return true;
}

function solveBacktrack(grid: Grid, row: number, col: number): Grid | null {
    if (row === SIZE) {
        return grid;
    }
    const nextRow = col === SIZE - 1 ? row + 1 : row;
    const nextCol = col === SIZE - 1 ? 0 : col + 1;

    if (grid[row][col] !== null) {
        return solveBacktrack(grid, nextRow, nextCol);
    }

    for (let num = 1; num <= SIZE; num++) {
        const n = num as NonNullable<CellValue>;
        if (!isValid(grid, row, col, n)) continue;
        grid[row][col] = n;
        if (!nextEmptyCellHasOption(grid, nextRow, nextCol)) {
            grid[row][col] = null;
            continue;
        }
        const result = solveBacktrack(grid, nextRow, nextCol);
        if (result) return result;
        grid[row][col] = null;
    }
    return null;
}

export function solveSudoku(grid: Grid): Grid | null {
    const copy = grid.map((r) => [...r]);
    if (!isValidPartialGrid(copy)) return null;
    return solveBacktrack(copy, 0, 0);
}

export function createEmptyGrid(): Grid {
    return Array(SIZE)
        .fill(null)
        .map(() => Array(SIZE).fill(null) as CellValue[]);
}

export function cloneGrid(grid: Grid): Grid {
    return grid.map((r) => [...r]);
}
