import { SudokuSolver } from './components/SudokuSolver';
import { Footer } from './components/Footer';

function App() {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <div className="flex flex-col items-center flex-1">
                <h1
                    className="mt-2 text-4xl font-normal"
                    style={{ fontFamily: "'Indie Flower', cursive" }}
                >
                    Sudoku Solver
                </h1>
                <SudokuSolver />
            </div>
            <Footer />
        </div>
    );
}

export default App;
