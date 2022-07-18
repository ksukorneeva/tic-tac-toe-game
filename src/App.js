import { useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState(null);
    const [winner, setWinner] = useState(null);

    const clickHandler = (index) => {
        if (board[index] !== null || winner !== null) return;
        const copyBoard = [...board];
        copyBoard[index] = player;
        setBoard(copyBoard);
        setPlayer(player === 'X' ? 'O' : 'X');
    };

    const checkWinner = useCallback(() => {
        const listWinner = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < listWinner.length; i++) {
            const [a, b, c] = listWinner[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c])
                setWinner(board[a]);
        }
        const draw = board.every((elem) => elem !== null);
        draw && setWinner('дружба');
    }, [setWinner, board]);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setPlayer(null);
    };

    useEffect(() => {
        checkWinner();
    }, [checkWinner]);

    if (!player) {
        return (
            <>
                <h2>Чем хотите играть?</h2>
                <div className='actions'>
                    <button onClick={() => setPlayer('X')}>Крестик</button>
                    <button onClick={() => setPlayer('O')}>Нолик</button>
                </div>
            </>
        );
    }
    return (
        <>
            {' '}
            {winner ? (
                <>
                    <h1>Победил(a): {winner}</h1>
                    <button onClick={resetGame}>Начать заново</button>
                </>
            ) : (
                <h1>Сейчас ходит: {player}</h1>
            )}
            <div className='field'>
                {board.map((item, index) => (
                    <div
                        className='field-grid'
                        key={index}
                        onClick={() => clickHandler(index)}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
