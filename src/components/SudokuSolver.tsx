import { useState, useCallback, useEffect } from 'react';
import { SudokuGrid } from './SudokuGrid';
import { Button } from './Button';
import type { Grid, CellValue } from '../types';
import { solveSudoku, createEmptyGrid, cloneGrid } from '../lib/solver';

const SIZE = 9;
const VALID_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const DIRECTION_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

function createGivenMask(): boolean[][] {
    return Array(SIZE)
        .fill(null)
        .map(() => Array(SIZE).fill(false));
}

export function SudokuSolver() {
    const [grid, setGrid] = useState<Grid>(createEmptyGrid);
    const [given, setGiven] = useState<boolean[][]>(createGivenMask);
    const [selectedCell, setSelectedCell] = useState<{
        row: number;
        col: number;
    } | null>(null);
    const [solved, setSolved] = useState(false);

    const setCell = useCallback(
        (row: number, col: number, value: CellValue) => {
            if (given[row][col]) return;
            setGrid((prev) => {
                const next = cloneGrid(prev);
                next[row][col] = value;
                return next;
            });
        },
        [given]
    );

    const clearCell = useCallback(
        (row: number, col: number) => {
            if (given[row][col]) return;
            setCell(row, col, null);
        },
        [given, setCell]
    );

    const handleSolve = useCallback(() => {
        const solution = solveSudoku(grid);
        if (solution) {
            setGrid(solution);
            setSolved(true);
        } else {
            alert('No solution exists for this puzzle.');
        }
    }, [grid]);

    const handleClear = useCallback(() => {
        setGrid(createEmptyGrid());
        setGiven(createGivenMask());
        setSelectedCell(null);
        setSolved(false);
    }, []);

    const handleClearSolution = useCallback(() => {
        setGrid(
            (prev) =>
                prev.map((row, r) =>
                    row.map((val, c) => (given[r][c] ? val : null))
                ) as Grid
        );
        setSolved(false);
    }, [given]);

    const moveSelection = useCallback((dr: number, dc: number) => {
        setSelectedCell((prev) => {
            if (!prev) return { row: 0, col: 0 };
            const row = Math.max(0, Math.min(SIZE - 1, prev.row + dr));
            const col = Math.max(0, Math.min(SIZE - 1, prev.col + dc));
            return { row, col };
        });
    }, []);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (!selectedCell) return;
            if (DIRECTION_KEYS.includes(e.key)) {
                e.preventDefault();
                const map: Record<string, [number, number]> = {
                    ArrowUp: [-1, 0],
                    ArrowDown: [1, 0],
                    ArrowLeft: [0, -1],
                    ArrowRight: [0, 1],
                };
                const [dr, dc] = map[e.key];
                moveSelection(dr, dc);
                return;
            }
            if (VALID_KEYS.includes(e.key)) {
                e.preventDefault();
                setCell(
                    selectedCell.row,
                    selectedCell.col,
                    Number(e.key) as CellValue
                );
                return;
            }
            if (e.key === 'Backspace' || e.key === 'Delete') {
                e.preventDefault();
                clearCell(selectedCell.row, selectedCell.col);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [selectedCell, setCell, clearCell, moveSelection]);

    const handleCellSelect = useCallback((row: number, col: number) => {
        setSelectedCell({ row, col });
    }, []);

    return (
        <div className="flex flex-col m-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-[var(--color-grey)]">
                        Sudoku Solver
                    </span>
                    {selectedCell && (
                        <span className="text-sm text-[var(--color-secondary)]">
                            (Tip: type 1–9 to fill, Backspace to clear, arrows
                            to move)
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={handleSolve}>Solve</Button>
                    {solved ? (
                        <Button
                            variant="secondary"
                            onClick={handleClearSolution}
                        >
                            Clear solution
                        </Button>
                    ) : null}
                    <Button variant="secondary" onClick={handleClear}>
                        Clear all
                    </Button>
                </div>
            </div>

            <div className="flex flex-wrap justify-center items-start gap-6">
                <SudokuGrid
                    grid={grid}
                    given={given}
                    selectedCell={selectedCell}
                    onCellSelect={handleCellSelect}
                />
                <div className="max-w-[300px] mt-4">
                    <h2 className="text-lg font-semibold mb-2">How to use</h2>
                    <p className="text-sm text-justify text-[var(--color-grey)]">
                        Click a cell to select it, then type{' '}
                        <strong>1–9</strong> to enter a clue or{' '}
                        <strong>Backspace</strong> to clear it. Use the arrow
                        keys to move between cells. When your puzzle is ready,
                        click <strong>Solve</strong> to get the solution. Use{' '}
                        <strong>Clear solution</strong> to remove the solution
                        and edit again, or <strong>Clear all</strong> to start
                        over.
                    </p>
                </div>
            </div>
        </div>
    );
}
