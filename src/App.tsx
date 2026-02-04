import { SudokuSolver } from './components/SudokuSolver';
import { Footer } from './components/Footer';

function App() {
    return (
        <div className="flex flex-col justify-between min-h-screen px-2 sm:px-4">
            <div className="flex flex-col items-center flex-1 w-full max-w-4xl mx-auto">
                <h1
                    className="mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-normal"
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
