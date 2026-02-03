import { Cell } from './Cell';
import type { Grid } from '../types';

const BLOCK = 3;

interface CellsBlockProps {
    blockIndex: number;
    grid: Grid;
    given: boolean[][];
    selectedCell: { row: number; col: number } | null;
    onCellSelect: (row: number, col: number) => void;
}

export function CellsBlock({
    blockIndex,
    grid,
    given,
    selectedCell,
    onCellSelect,
}: CellsBlockProps) {
    const startRow = Math.floor(blockIndex / BLOCK) * BLOCK;
    const startCol = (blockIndex % BLOCK) * BLOCK;
    const cells = [];

    for (let i = 0; i < BLOCK; i++) {
        for (let j = 0; j < BLOCK; j++) {
            const row = startRow + i;
            const col = startCol + j;
            const value = grid[row][col];
            const isGiven = given[row][col];
            const state = isGiven
                ? 'given'
                : value !== null
                ? 'solved'
                : 'empty';
            const selected =
                selectedCell?.row === row && selectedCell?.col === col;

            cells.push(
                <Cell
                    key={`${row}-${col}`}
                    value={value}
                    state={state}
                    selected={selected}
                    onClick={() => onCellSelect(row, col)}
                />
            );
        }
    }

    return (
        <div
            role="row"
            className="grid grid-cols-3 grid-rows-3 gap-0 place-items-stretch border border-black [&>div]:min-h-[calc(100%/3)]"
            style={{ aspectRatio: '1' }}
        >
            {cells}
        </div>
    );
}
