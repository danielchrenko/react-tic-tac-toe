import { useState } from 'react';

function Square({value, onSquareClick}) {
	
	return <button className="square" onClick={onSquareClick}>{value}</button>;
}

export default function Board() {
	
	const [xIsNext, setXIsNext] = useState(true);
	const [squares, setSquares] = useState(Array(9).fill(null));
	
	function handleClick(i) {
		const nextSquares = squares.slice();
		
		if (squares[i] || calculateWinner(squares)) {
			return;
			// if there is already a value in the square
		}
		
		// there is no value in the squares
		if (xIsNext) {
			nextSquares[i] = "X";
		} else {
			nextSquares[i] = "O";
		}
		
		setXIsNext(!xIsNext);
		setSquares(nextSquares);
	}
	
	function clearGame() {
		const clearBoard = Array(9).fill(null);
		setSquares(clearBoard);
		setXIsNext(true);
	}
	
	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = "Winner: " + winner;
	} else {
		status = "Next player: " + (xIsNext ? "X" : "O");
	}
	
	return (
		<>
			<h1> Tic-Tac-Toe by Daniel Chrenko</h1>
			<h6> Tutorial: https://react.dev/learn/tutorial-tic-tac-toe </h6>
			<br></br>
			<div className="status">{status}</div>
			<div className="board-row">
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className="board-row">
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className="board-row">
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
			<br></br>
			<button onClick={() => clearGame()}>Start Game!</button>
		</>
	);
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null
}