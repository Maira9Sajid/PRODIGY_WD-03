const boxes = document.querySelectorAll('.box');
const restartBtn = document.getElementById('restartBtn');
const playerText = document.getElementById('player-text');
let currentPlayer = 'X';
let board = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleClick = (e) => {
    const id = e.target.id;

    if (!board[id] && !checkWinner()) {
        board[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        if (checkWinner()) {
            playerText.innerText = `${currentPlayer} Wins!`;
            winningCombinations.forEach(combination => {
                if (combination.every(index => board[index] === currentPlayer)) {
                    combination.forEach(index => {
                        document.getElementById(index).classList.add('winner-animation');
                    });
                }
            });
        } else if (board.every(box => box !== null)) {
            playerText.innerText = 'Draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
};

const checkWinner = () => {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
};

const restartGame = () => {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    playerText.innerText = 'Tic Tac Toe';
    boxes.forEach(box => {
        box.innerText = '';
        box.classList.remove('winner-animation');
    });
};

boxes.forEach(box => box.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
