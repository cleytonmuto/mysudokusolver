import type { CellValue, CellState } from '../types';

interface CellProps {
    value: CellValue;
    state: CellState;
    selected: boolean;
    onClick: () => void;
}

export function Cell({ value, state, selected, onClick }: CellProps) {
    const display = value ?? '';
    const isGiven = state === 'given';
    const isSolved = state === 'solved';

    const base =
        'w-full h-full min-w-0 min-h-0 flex items-center justify-center text-base sm:text-lg md:text-xl cursor-pointer border border-[var(--color-grey)] text-[var(--color-grey)] select-none touch-manipulation';
    const given = isGiven ? 'font-bold text-[var(--color-secondary)]' : '';
    const solved =
        isSolved && !isGiven ? 'font-bold text-[var(--color-secondary)]' : '';
    const selectedClass = selected
        ? 'bg-[var(--color-primary)] text-[var(--color-grey)]'
        : '';

    return (
        <div
            role="cell"
            className={`${base} ${given} ${solved} ${selectedClass}`}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            tabIndex={0}
            aria-label={`Cell ${display || 'empty'} ${state}`}
        >
            {display}
        </div>
    );
}
