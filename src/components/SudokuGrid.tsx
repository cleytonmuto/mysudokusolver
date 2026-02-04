import { CellsBlock } from './CellsBlock';
import type { Grid } from '../types';

const BLOCK = 3;

interface SudokuGridProps {
    grid: Grid;
    given: boolean[][];
    selectedCell: { row: number; col: number } | null;
    onCellSelect: (row: number, col: number) => void;
}

export function SudokuGrid({
    grid,
    given,
    selectedCell,
    onCellSelect,
}: SudokuGridProps) {
    return (
        <div
            className="w-full max-w-[500px] aspect-square border border-black"
            style={{ maxWidth: 'min(500px, calc(100vw - 2rem))' }}
        >
            <div
                className="grid gap-0 w-full h-full border-0"
                style={{
                    gridTemplateColumns: `repeat(${BLOCK}, 1fr)`,
                    gridTemplateRows: `repeat(${BLOCK}, 1fr)`,
                }}
                role="grid"
            >
                {Array.from({ length: 9 }, (_, i) => (
                    <CellsBlock
                        key={i}
                        blockIndex={i}
                        grid={grid}
                        given={given}
                        selectedCell={selectedCell}
                        onCellSelect={onCellSelect}
                    />
                ))}
            </div>
        </div>
    );
}
