window.addEventListener('DOMContentLoaded', () => {
    const squares = Array.from(document.querySelectorAll('.square'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const gameResult = document.querySelector('.gameResult');


    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;


    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function gameEndCheck() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const firstValue = board[winCondition[0]];
            const secondValue = board[winCondition[1]];
            const thirdValue = board[winCondition[2]];
            if (firstValue === '' || secondValue === '' || thirdValue === '') {
                continue;
            }
            if (firstValue === secondValue && secondValue === thirdValue) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
        endResult(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    else if (!board.includes(''))
    endResult(TIE);
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const endResult = (type) => {
        switch(type){
            case PLAYERO_WON:
                gameResult.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                gameResult.innerHTML = 'Player <span class="playerX">X</span> Won.';
                break;
            case TIE:
                gameResult.innerText = 'Tie';
        }
        gameResult.classList.remove('hide');
    };

    const isValidAction = (square) => {
        if (square.innerText === 'X' || square.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const userAction = (square, index) => {
        if(isValidAction(square) && isGameActive) {
            square.innerText = currentPlayer;
            square.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            gameEndCheck();
            changePlayer();
        }
    }
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        gameResult.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        squares.forEach(square => {
            square.innerText = '';
            square.classList.remove('playerX');
            square.classList.remove('playerO');
        });
    }

    squares.forEach( (square, index) => {
        square.addEventListener('click', () => userAction(square, index));
    });

    resetButton.addEventListener('click', resetBoard);
});